<template>
  <h2 v-if="winner">Winner: {{ winner }} &#128525;</h2>
  <h2 v-else>Player Move: {{ player }}</h2>

  <BButton variant="primary mt-3 mb-5" @click="reset">Reset</BButton>

  <BContainer>
    <BRow v-for="x in 3" :key="x">
      <button
        v-for="y in 3"
        :key="y"
        class="square"
        @click="squares[x - 1][y - 1] === '' && move(x - 1, y - 1)"
      >
        {{ squares[x - 1][y - 1] }}
      </button>
    </BRow>

    <h2 class="mt-5">History:</h2>
    <div v-for="(game, index) in history" :key="index">
      Game {{ index + 1 }}: {{ game }} won
    </div>
  </BContainer>
</template>

<script setup>
import { ref, computed, watch } from "vue";

const player = ref("X");
const history = ref([]);

const squares = ref([
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
]);

const winner = computed(() => calculateWinner(squares.value.flat()));

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let condition of lines) {
    const [x, y, z] = condition;
    if (squares[x] && squares[x] === squares[y] && squares[y] === squares[z]) {
      return squares[x];
    }
  }
  return null;
};

const move = (x, y) => {
  if (winner.value) return;
  squares.value[x][y] = player.value;
  player.value = player.value === "O" ? "X" : "O";
};

const reset = () => {
  player.value = "X";
  squares.value = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
};

watch(winner, (current, previous) => {
  if (current) {
    history.value.push(current);
  }
});
</script>

<style scoped>
.square {
  background: #fff;
  border: 1px solid #999;
  float: left;
  font-size: 70px;
  font-weight: bold;
  line-height: 34px;
  height: 100px;
  margin-right: -1px;
  margin-top: -1px;
  padding: 0;
  text-align: center;
  width: 100px;
}
</style>
