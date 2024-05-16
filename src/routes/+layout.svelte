<script>
  import '../app.css';
  import ogImage from '$lib/assets/og_image.jpg';
</script>

<svelte:head>
  <title>Plinko</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
  <link
    href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap"
    rel="stylesheet"
  />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="Plinko" />
  <meta property="og:url" content="https://plinko-web-game.netlify.app/" />
  <meta property="og:image" content={ogImage} />
</svelte:head>

<slot />
