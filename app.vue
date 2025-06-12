<template>
	<UApp>
		<UContainer>
			<UNavigationMenu :items="menuItems" />
		</UContainer>
		<NuxtPage />
	</UApp>
</template>

<script setup lang="ts">
	const menuItems = [
		{ label: 'Home', to: '/' },
		{ label: 'Movies', to: '/movies' },
	];
</script>
