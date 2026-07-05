<script lang="ts">
  import '../app.css';
  import Navbar from '$lib/components/Navbar.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import MobileNav from '$lib/components/MobileNav.svelte';
  import CartDrawer from '$lib/components/CartDrawer.svelte';
  import Toast from '$lib/components/Toast.svelte';
</script>

<Navbar />
<MobileNav />
<CartDrawer />
<Toast />

<main class="main">
  <slot />
</main>

<Footer />

<style>
  .main { flex: 1; }
</style>
