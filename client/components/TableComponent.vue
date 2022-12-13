<script setup lang="ts">
import { Model } from '../models/Model';
import { mdiChevronUp , mdiChevronDown, mdiBookOpenPageVariantOutline  } from '@mdi/js';
import { SortDirection } from '@tailflow/laravel-orion/lib/drivers/default/enums/sortDirection';

enum Direction {
  Asc = 'asc',
  Desc = 'desc',
  None = ''
}


interface Header {title: string, value: string, class: string, sortable?: boolean, sort?: Direction}

const props = defineProps<{
    headers: Array<Header>,
    model: Model
}>()
const data = ref<Array<Model>>([])
const page = ref(0)
const perPage = ref(0)
const paginationLength = ref(0)
const search = ref('')
const loading = ref(true)
data.value = await props.model.$query().get()
props.headers.forEach(el => {
    if(el.sortable) {
        el.sort = Direction.None
    }
})
const headers = ref(props.headers)
page.value = data.value[0]?.$response?.data.meta.page
perPage.value = data.value[0]?.$response?.data.meta.per_page
paginationLength.value = data.value[0]?.$response?.data.meta.last_page
loading.value = false
const onPageChange = async (p: number) => {
    loading.value = true
    data.value = await props.model.$query().lookFor(search.value).search(perPage.value,p)
    loading.value = false

}

const onSearch = async (value: string) => {
    loading.value = true
    data.value = await props.model.$query().lookFor(value).search(perPage.value,page.value)
    paginationLength.value = data.value[0]?.$response?.data.meta.last_page
    perPage.value = data.value[0]?.$response?.data.meta.per_page
    loading.value = false
}

const onPerPage = async (value: number) => {
    loading.value = true
    data.value = await props.model.$query().lookFor(search.value).search(value,page.value)
    paginationLength.value = data.value[0]?.$response?.data.meta.last_page
    perPage.value = value
}

const toggleDirection = async (item: Header) => {
    if(item.sort == Direction.Asc) {
        item.sort = Direction.Desc
        loading.value = true
        data.value = await props.model.$query().sortBy(item.value, SortDirection.Desc).lookFor(search.value).search(perPage.value,page.value)
        loading.value = false
    }else if(item.sort == Direction.None){
        item.sort = Direction.Asc
        loading.value = true
        data.value = await props.model.$query().sortBy(item.value, SortDirection.Asc).lookFor(search.value).search(perPage.value,page.value)
        loading.value = false
    }else {
        item.sort = Direction.None
        loading.value = true
        data.value = await props.model.$query().lookFor(search.value).search(perPage.value,page.value)
        loading.value = false
    }
}


</script>
<template>
<div>
    <v-row justify="end">
        <v-col md="2">
            <v-select @update:model-value="onPerPage" v-model="perPage" bg-color="grey-lighten-4" :prepend-inner-icon="mdiBookOpenPageVariantOutline" variant="solo" :items="[10,15,30]" density="compact" class="mb-1"  hide-details></v-select>

        </v-col>
        <v-col md="3">
            <v-text-field bg-color="grey-lighten-4" @update:model-value="onSearch" variant="solo" v-model="search" density="compact" class="mb-1" clearable hide-details placeholder="Search..." color="grey" type="search"></v-text-field>
        </v-col>
    </v-row>
    <v-table>
        <tr>
            <td :colspan="headers.length">
                <v-progress-linear :active="loading" color="primary" indeterminate></v-progress-linear></td>
        </tr>
    <thead class="elevation-5">
        <tr>
            <template v-for="item,i in headers">
                <th class="bg-pink" :class="{'rounded-ts-lg': i===0, 'rounded-te-lg': i===headers.length-1}">
                   <template v-if="item.sortable">
                    <v-btn  v-ripple @click="toggleDirection(item)" variant="text" color="blue-grey-lighten-3">
                    {{ item.title }}
                    <template v-slot:append>
                        <div>
                            <div class="d-block">
                                <v-icon :color="item.sort == Direction.Asc ? 'white' : ''">{{ mdiChevronUp }}</v-icon>
                            </div>
                            <div class="d-block">
                                <v-icon :color="item.sort == Direction.Desc ? 'white' : ''">{{ mdiChevronDown }}</v-icon>
                            </div>
                       </div>
                       
                    </template>

                    </v-btn>
                   </template>
                    <span class="text-blue-grey-lighten-3" v-else>{{ item.title }}</span>
                </th>
            </template>
        </tr>
    </thead>
    <tbody>
        <template v-for="item in data">
            <tr>
                <template v-for="head in headers">
                    <td class="border">{{ item.$attributes[head.value] }}</td>
                </template>
            </tr>
        </template>
    </tbody>
    <tfoot>
        <td :colspan="headers.length">
            <div class="text-center">
                <v-pagination
                @update:model-value="onPageChange"
                border
                density="comfortable"
                active-color="pink-accent-3"
                v-model="page"
                :length="paginationLength"
                :total-visible="7"
                ></v-pagination>
            </div>
        </td>
    </tfoot>
</v-table>

</div>
</template>