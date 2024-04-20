<script lang="ts">
	import { getRandomBetween } from '$lib/utils/numbers';
	import Matter from 'matter-js';
	import { onMount } from 'svelte';

	export let rows = 8;

	let canvas: HTMLCanvasElement;

	onMount(() => {
		const engine = Matter.Engine.create({
			timing: {
				timeScale: 1,
			},
		});
		const render = Matter.Render.create({
			engine,
			canvas,
			options: {
				width: 760,
				height: 570,
				wireframes: false,
				showStats: true,
				// showPositions: true,
				// showIds: true,
			},
		});
		const runner = Matter.Runner.create();

		const WALL_THICKNESS = 30;

		const PADDING_X = 52;
		const PADDING_Y = 36;

		const PIN_CATEGORY = 0x0001;
		const BALL_CATEGORY = 0x0002;

		const sensor = Matter.Bodies.rectangle(canvas.width / 2, canvas.height, canvas.width, 10, {
			isSensor: true,
			isStatic: true,
		});
		const leftWall = Matter.Bodies.rectangle(
			0 - WALL_THICKNESS / 2,
			canvas.height / 2,
			WALL_THICKNESS,
			canvas.height,
			{ isStatic: true },
		);

		const rightWall = Matter.Bodies.rectangle(
			canvas.width + WALL_THICKNESS / 2,
			canvas.height / 2,
			WALL_THICKNESS,
			canvas.height,
			{ isStatic: true },
		);

		Matter.Composite.add(engine.world, [sensor, leftWall, rightWall]);

		// Draw the pins
		const pins: Matter.Body[] = [];

		const lastRowPinCount = 3 + rows - 1;
		const pinDistanceX = (canvas.width - PADDING_X * 2) / (lastRowPinCount - 1);

		for (let row = 0; row < rows; ++row) {
			const rowY = PADDING_Y + ((canvas.height - PADDING_Y * 2) / (rows - 1)) * row;

			/** Horizontal distance between canvas boundary and first/last pin of the row. */
			const rowPaddingX = PADDING_X + ((rows - 1 - row) * pinDistanceX) / 2;

			for (let col = 0; col < 3 + row; ++col) {
				const colX = rowPaddingX + ((canvas.width - rowPaddingX * 2) / (3 + row - 1)) * col;
				const pin = Matter.Bodies.circle(colX, rowY, 8, {
					isStatic: true,
					render: {
						fillStyle: '#ffffff',
					},
					collisionFilter: {
						category: PIN_CATEGORY,
						mask: BALL_CATEGORY, // Collide with balls
					},
				});
				pins.push(pin);
			}
		}
		Matter.Composite.add(engine.world, pins);

		const dropBall = () => {
			const ballOffsetX = pinDistanceX * 0.5;
			const ball = Matter.Bodies.circle(
				getRandomBetween(canvas.width / 2 - ballOffsetX, canvas.width / 2 + ballOffsetX),
				0,
				pinDistanceX * 0.25,
				{
					restitution: 0.45, // Bounciness
					friction: 0.01,
					collisionFilter: {
						category: BALL_CATEGORY,
						mask: PIN_CATEGORY, // Collide with pins only, but not other balls
					},
					render: {
						fillStyle: '#ff0000',
					},
				},
			);
			Matter.Composite.add(engine.world, ball);
		};

		dropBall();
		const dropBallInterval = setInterval(dropBall, 1000);

		Matter.Events.on(engine, 'collisionStart', ({ pairs }) => {
			pairs.forEach(({ bodyA, bodyB }) => {
				if (bodyA === sensor) {
					Matter.Composite.remove(engine.world, bodyB);
				} else if (bodyB === sensor) {
					Matter.Composite.remove(engine.world, bodyA);
				}
			});
		});

		Matter.Render.run(render); // Renders the scene to canvas
		Matter.Runner.run(runner, engine); // Starts the simulation in physics engine

		return () => {
			clearInterval(dropBallInterval);
			Matter.Render.stop(render);
			Matter.Runner.stop(runner);
		};
	});
</script>

<div class="w-fit">
	<canvas bind:this={canvas} />
</div>
