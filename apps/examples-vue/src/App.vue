<script setup lang="ts">
import { CButton } from '@componentry/vue'

function onClick() {
  console.log('clicked!')
}
</script>

<template>
  <CButton label="Click me" variant="primary" @c-click="onClick" />
</template>