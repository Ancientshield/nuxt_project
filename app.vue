<template>
	<UApp>
		<UContainer>
			<UNavigationMenu :items="menuItems" class="justify-center py-2" />
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

<style scoped></style>
