/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number} diff
 * @return {number}
 */
var numberOfPairs = function(nums1, nums2, diff) {
    let result = 0;

    // Função que realiza a etapa de "merge" durante a divisão e conquista
    function merge(container, temp, start, mid, high, diff) {
        let i = start, j = mid, k = start, count = 0;

        // Loop para comparar elementos e contar pares válidos
        while (i < mid && j <= high) {
            if (container[j] + diff >= container[i]) {
                count += (high - j + 1);
                i++;
            } else {
                j++;
            }
        }

        // Resetando índices
        i = start; j = mid; k = start;

        // Loop para mesclar os dois subarrays ordenados
        while (i < mid && j <= high) {
            if (container[i] <= container[j]) {
                temp[k++] = container[i++];
            } else {
                temp[k++] = container[j++];
            }
        }

        // Lidando com elementos restantes
        while (i < mid) {
            temp[k++] = container[i++];
        }

        while (j <= high) {
            temp[k++] = container[j++];
        }

        // Atualizando o array original
        for (let i = start; i <= high; i++) {
            container[i] = temp[i];
        }

        return count;
    }

    // Função principal de dividir e conquistar
    function solve(container, temp, start, end, diff) {
        let answer = 0, mid;

        // Condição de parada: um único elemento ou array vazio
        if (end > start) {
            // Encontrando o ponto médio
            mid = (start + end) >> 1;

            // Chamadas recursivas para as duas metades do array
            answer += solve(container, temp, start, mid, diff);
            answer += solve(container, temp, mid + 1, end, diff);

            // Contagem e mesclagem durante a fase de combinação
            answer += merge(container, temp, start, mid + 1, end, diff);
        }

        return answer;
    }

    // Tamanho do array
    const n = nums1.length;

    // Arrays temporários para o merge
    const container = new Array(n).fill(0);
    const temp = new Array(n).fill(0);

    // Calculando a diferença entre os elementos dos arrays
    for (let i = 0; i < n; i++) {
        container[i] = nums1[i] - nums2[i];
    }

    // Chamando a função principal
    result = solve(container, temp, 0, n - 1, diff);

    return result;
};
