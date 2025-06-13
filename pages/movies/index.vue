<template>
	<div class="justify-center">
		<div class="flex flex-col items-center">
			<h1 class="text-3xl font-bold mb-1">Movies</h1>
		</div>
		<div v-if="!isLoggedIn">
			<UCard class="max-w-xs mx-auto text-center">
				<p class="text-red-500">Please log in to search!</p>
			</UCard>
		</div>
		<div v-else>
			<div class="flex flex-col items-center">
				<p class="text-gray-600">Search for your favorite movies</p>
				<MovieSearch />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { useAuth } from '~/composables/useAuth';
	const isLoggedIn = useAuth();
</script>
