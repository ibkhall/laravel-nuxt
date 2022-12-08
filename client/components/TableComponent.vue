<script setup lang="ts">

</script>
<template>
<div>
    <v-text-field placeholder="Search..." color="inherit" type="search"></v-text-field>
    <v-table>
    <thead>
        <tr>
            <th class="bg-pink rounded-ts-lg">#</th>
            <th class="bg-pink">Nom</th>
            <th class="bg-pink rounded-te-lg">Email</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td class="border">1</td>
            <td class="border">Ibkhall</td>
            <td class="border">Ibkhall@site.com</td>
        </tr>
        <tr>
            <td class="border">1</td>
            <td class="border">Ibkhall</td>
            <td class="border">Ibkhall@site.com</td>
        </tr>

        <tr>
            <td class="border rounded-bs-lg">1</td>
            <td class="border">Ibkhall</td>
            <td class="border rounded-be-lg">Ibkhall@site.com</td>
        </tr>
    </tbody>
</v-table>
</div>
</template>