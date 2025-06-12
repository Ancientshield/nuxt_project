<template>
	<UApp>
		<UContainer>
			<UNavigationMenu :items="menuItems" class="justify-center" />
		</UContainer>
		<UContainer>
			<NuxtPage />
		</UContainer>
	</UApp>
</template>

<script setup lang="ts">
	const menuItems = [
		{ label: 'Home', to: '/' },
		{ label: 'Movies', to: '/movies' },
	];
</script>

<style scoped></style>
