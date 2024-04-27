import { rowCount, winRecords } from '$lib/stores/game';
import { getRandomBetween } from '$lib/utils/numbers';
import Matter from 'matter-js';
import { get } from 'svelte/store';

/**
 * Engine for rendering the Plinko game using [matter-js](https://brm.io/matter-js/).
 *
 * The engine will read/write data to Svelte stores during game state changes.
 */
class PlinkoEngine {
  /**
   * The canvas element to render the game to.
   */
  private canvas: HTMLCanvasElement;

  /**
   * A cache value of the {@link rowCount} store for faster access. It's updated
   * when the store value changes.
   */
  private rowCount: number;
  /**
   * The x-coordinates of every pin's center in the last row. Useful for calculating
   * which bin a ball falls into.
   */
  private pinsLastRowXCoords: number[] = [];

  private engine: Matter.Engine;
  private render: Matter.Render;
  private runner: Matter.Runner;

  private pins: Matter.Body[] = [];
  /**
   * Walls are invisible, slanted "guard rails" at the left and right sides of the
   * pin triangle. It prevents balls from falling outside the pin triangle and not
   * hitting a bin.
   */
  private walls: Matter.Body[] = [];
  /**
   * "Sensor" is an invisible body at the bottom of the canvas. It detects whether
   * a ball arrives at the bottom and enters a bin.
   */
  private sensor: Matter.Body;

  static PIN_CATEGORY = 0x0001;
  static BALL_CATEGORY = 0x0002;

  static WIDTH = 760;
  static HEIGHT = 570;
  static PADDING_X = 52;
  static PADDING_Y = 36;

  /**
   * Creates the engine and the game's layout.
   *
   * @param canvas The canvas element to render the game to.
   *
   * @remarks This constructor does NOT start the rendering and physics engine.
   * Call the `start` method to start the engine.
   */
  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;

    this.rowCount = get(rowCount);
    rowCount.subscribe((newRowCount) => this.updateRowCount(newRowCount));

    this.engine = Matter.Engine.create({
      timing: {
        timeScale: 1,
      },
    });
    this.render = Matter.Render.create({
      engine: this.engine,
      canvas: this.canvas,
      options: {
        width: PlinkoEngine.WIDTH,
        height: PlinkoEngine.HEIGHT,
        background: '#0f1728',
        wireframes: false,
      },
    });
    this.runner = Matter.Runner.create();

    this.placePinsAndWalls();

    this.sensor = Matter.Bodies.rectangle(
      this.canvas.width / 2,
      this.canvas.height,
      this.canvas.width,
      10,
      {
        isSensor: true,
        isStatic: true,
        render: {
          visible: false,
        },
      },
    );
    Matter.Composite.add(this.engine.world, [this.sensor]);
    Matter.Events.on(this.engine, 'collisionStart', ({ pairs }) => {
      pairs.forEach(({ bodyA, bodyB }) => {
        if (bodyA === this.sensor) {
          this.handleSensorCollision(bodyB);
        } else if (bodyB === this.sensor) {
          this.handleSensorCollision(bodyA);
        }
      });
    });
  }

  /**
   * Renders the game and starts the physics engine.
   */
  start() {
    Matter.Render.run(this.render); // Renders the scene to canvas
    Matter.Runner.run(this.runner, this.engine); // Starts the simulation in physics engine
  }

  /**
   * Stops (pauses) the rendering and physics engine.
   */
  stop() {
    Matter.Render.stop(this.render);
    Matter.Runner.stop(this.runner);
  }

  /**
   * Drops a new ball from the top with a random horizontal offset.
   */
  dropBall() {
    const ballOffsetRangeX = this.pinDistanceX;
    const ballRadius = this.pinRadius * 2;

    const ball = Matter.Bodies.circle(
      getRandomBetween(
        this.canvas.width / 2 - ballOffsetRangeX,
        this.canvas.width / 2 + ballOffsetRangeX,
      ),
      0,
      ballRadius,
      {
        restitution: 0.8, // Bounciness
        // Higher friction -> more likely fall into bins at center (lower variance)
        friction: 0.6,
        frictionAir: 0.04,
        collisionFilter: {
          category: PlinkoEngine.BALL_CATEGORY,
          mask: PlinkoEngine.PIN_CATEGORY, // Collide with pins only, but not other balls
        },
        render: {
          fillStyle: '#ff0000',
        },
      },
    );
    Matter.Composite.add(this.engine.world, ball);
  }

  /**
   * Gets the horizontal distance between each pin's center point.
   */
  private get pinDistanceX(): number {
    const lastRowPinCount = 3 + this.rowCount - 1;
    return (this.canvas.width - PlinkoEngine.PADDING_X * 2) / (lastRowPinCount - 1);
  }

  private get pinRadius(): number {
    return (24 - this.rowCount) / 2;
  }

  /**
   * Refreshes the game with a new number of rows.
   *
   * Does nothing if the new row count equals the current count.
   */
  private updateRowCount(rowCount: number) {
    if (rowCount === this.rowCount) {
      return;
    }

    this.removeAllBalls();

    this.rowCount = rowCount;
    this.placePinsAndWalls();
  }

  /**
   * Called when a ball hits the invisible sensor at the bottom.
   */
  private handleSensorCollision(ball: Matter.Body) {
    const binNumber = this.pinsLastRowXCoords.findLastIndex((pinX) => pinX < ball.position.x);
    if (binNumber !== -1 && binNumber < this.pinsLastRowXCoords.length - 1) {
      winRecords.update((records) => [...records, { binIndex: binNumber }]);
    }

    Matter.Composite.remove(this.engine.world, ball);
  }

  /**
   * Renders the pins and walls. Previous ones are removed before rendering new ones.
   */
  private placePinsAndWalls() {
    const { PADDING_X, PADDING_Y, PIN_CATEGORY, BALL_CATEGORY } = PlinkoEngine;

    if (this.pins.length > 0) {
      Matter.Composite.remove(this.engine.world, this.pins);
      this.pins = [];
    }
    if (this.pinsLastRowXCoords.length > 0) {
      this.pinsLastRowXCoords = [];
    }
    if (this.walls.length > 0) {
      Matter.Composite.remove(this.engine.world, this.walls);
      this.walls = [];
    }

    for (let row = 0; row < this.rowCount; ++row) {
      const rowY = PADDING_Y + ((this.canvas.height - PADDING_Y * 2) / (this.rowCount - 1)) * row;

      /** Horizontal distance between canvas left/right boundary and first/last pin of the row. */
      const rowPaddingX = PADDING_X + ((this.rowCount - 1 - row) * this.pinDistanceX) / 2;

      for (let col = 0; col < 3 + row; ++col) {
        const colX = rowPaddingX + ((this.canvas.width - rowPaddingX * 2) / (3 + row - 1)) * col;
        const pin = Matter.Bodies.circle(colX, rowY, this.pinRadius, {
          isStatic: true,
          render: {
            fillStyle: '#ffffff',
          },
          collisionFilter: {
            category: PIN_CATEGORY,
            mask: BALL_CATEGORY, // Collide with balls
          },
        });
        this.pins.push(pin);

        if (row === this.rowCount - 1) {
          this.pinsLastRowXCoords.push(colX);
        }
      }
    }
    Matter.Composite.add(this.engine.world, this.pins);

    const firstPinX = this.pins[0].position.x;
    const leftWallAngle = Math.atan2(
      firstPinX - this.pinsLastRowXCoords[0],
      this.canvas.height - PADDING_Y * 2,
    );
    const leftWallX =
      firstPinX - (firstPinX - this.pinsLastRowXCoords[0]) / 2 - this.pinDistanceX * 0.25;

    const leftWall = Matter.Bodies.rectangle(
      leftWallX,
      this.canvas.height / 2,
      10,
      this.canvas.height,
      {
        isStatic: true,
        angle: leftWallAngle,
        render: { visible: false },
      },
    );
    const rightWall = Matter.Bodies.rectangle(
      this.canvas.width - leftWallX,
      this.canvas.height / 2,
      10,
      this.canvas.height,
      {
        isStatic: true,
        angle: -leftWallAngle,
        render: { visible: false },
      },
    );
    this.walls.push(leftWall, rightWall);
    Matter.Composite.add(this.engine.world, this.walls);
  }

  private removeAllBalls() {
    Matter.Composite.allBodies(this.engine.world).forEach((body) => {
      if (body.collisionFilter.category === PlinkoEngine.BALL_CATEGORY) {
        Matter.Composite.remove(this.engine.world, body);
      }
    });
  }
}

export default PlinkoEngine;
