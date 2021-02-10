<template>
    <div class="overlay" :class="over ? 'over' : ''">
		<slot></slot>
    </div>
</template>

<script>
export default {
	name: 'Overlay',
	props: {
		over:  {
			type: Boolean,
			required: false
		}
	}
}
</script>

<style scoped>
	.overlay {
		position: fixed;
		z-index: 11;
		top: 0;
		left: 0;
		background-color: rgba(0,0,0,0.4);
		width: 100%;
		height: 100%;
	}
	.overlay.over {
		z-index: 12;
	}
</style>