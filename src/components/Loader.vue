<template>
    <Overlay>
        <i class="fas fa-spinner fa-pulse"></i>
    </Overlay>
</template>

<script>
import Overlay from '@/components/Overlay'

export default {
    name: 'Loader',
    components: { Overlay },
}
</script>

<style scoped>
	i.fas {
		color: #fff;
		font-size: 60px;
		position: absolute;
		top: calc(50% - 30px);
		left: calc(50% - 30px);
	}
</style>