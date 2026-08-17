<script setup lang="ts">import { ApiMethodRegistry } from '@/app/utils/ApiMethodRegistry'
import { onBeforeUnmount, onMounted, ref } from 'vue'

const preRef = ref<HTMLPreElement | null>(null)

let previewTimerId: ReturnType<typeof setTimeout> | null = null

function drawPreview(): void {
  if (preRef.value) {
    preRef.value.innerText = JSON.stringify(units, null, 2)
  }

  previewTimerId = setTimeout(drawPreview, 100)
}

onMounted(() => {
  drawPreview()
})

onBeforeUnmount(() => {
  if (previewTimerId !== null) {
    clearTimeout(previewTimerId)
  }
})

// *************************
// Units
// *************************

interface UnitI {
  id: number
  x: number
}

const units: Array<UnitI | null> = [null]

function moveUnit(unitId: number, x: number): void {
  const unit = units[unitId]
  if (!unit) return console.warn('There is no unit', unitId)

  unit.x = x
}

function spawnUnit(): void {
  const unit: UnitI = {
    id: units.length,
    x: 0,
  }

  units.push(unit)

  console.log('Spawn unit', unit)
}

// *************************
// Api Method Registry
// *************************

const { OPCODE, methods, methodsArray } = new ApiMethodRegistry()
  .set('moveUnit', moveUnit)
  .set('spawnUnit', spawnUnit)
  .build()


// *************************
// Tests
// *************************

console.log(OPCODE)

methods.spawnUnit()
methods.moveUnit(1, 55)

methodsArray[OPCODE.SPAWN_UNIT]()

setTimeout(() => {
  methodsArray[OPCODE.MOVE_UNIT](2, 100)
}, 150)

</script>

<template>
  <main>
    <pre ref="preRef"></pre>
  </main>
</template>