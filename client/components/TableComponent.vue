<script setup lang="ts">
import { Model } from '../models/Model';

import { SortDirection } from '@tailflow/laravel-orion/lib/drivers/default/enums/sortDirection';
const {$emitter} = useNuxtApp()
enum Direction {
  Asc = 'asc',
  Desc = 'desc',
  None = ''
}


interface Header {title: string, value: string, class: string, sortable?: boolean, sort?: Direction, width?: string}

const props = defineProps<{
    headers: Array<Header>,
    model: Model,
    relations?: Array<string>,
}>()
const bus = ref(null)
const data = ref<Array<Model>>([])
const page = ref(0)
const perPage = ref(0)
const paginationLength = ref(0)
const search = ref('')
const loading = ref(true)
data.value = await props.model.$query().with(props.relations ?? []).get()
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

$emitter.on('onDelete', async () => {
        data.value = await props.model.$query().with(props.relations ?? []).lookFor(search.value).search(perPage.value, page.value)
    })


const onPageChange = async (p: number) => {
    loading.value = true
    data.value = await props.model.$query().with(props.relations ?? []).lookFor(search.value).search(perPage.value,p)
    loading.value = false

}

const onSearch = async (value: string) => {
    loading.value = true
    data.value = await props.model.$query().with(props.relations ?? []).lookFor(value).search(perPage.value,page.value)
    paginationLength.value = data.value[0]?.$response?.data.meta.last_page
    perPage.value = data.value[0]?.$response?.data.meta.per_page
    loading.value = false
}

const onPerPage = async (value: number) => {
    loading.value = true
    data.value = await props.model.$query().with(props.relations ?? []).lookFor(search.value).search(value,page.value)
    paginationLength.value = data.value[0]?.$response?.data.meta.last_page
    perPage.value = value
    loading.value = false
}

const toggleDirection = async (item: Header) => {
    if(item.sort == Direction.Asc) {
        item.sort = Direction.Desc
        loading.value = true
        data.value = await props.model.$query().with(props.relations ?? []).sortBy(item.value, SortDirection.Desc).lookFor(search.value).search(perPage.value,page.value)
        loading.value = false
    }else if(item.sort == Direction.None){
        item.sort = Direction.Asc
        loading.value = true
        data.value = await props.model.$query().with(props.relations ?? []).sortBy(item.value, SortDirection.Asc).lookFor(search.value).search(perPage.value,page.value)
        loading.value = false
    }else {
        item.sort = Direction.None
        loading.value = true
        data.value = await props.model.$query().with(props.relations ?? []).lookFor(search.value).search(perPage.value,page.value)
        loading.value = false
    }
}


</script>
<template>
<div>
    <v-row justify="start">
        <v-col md="2">
            <v-select @update:model-value="onPerPage" v-model="perPage" bg-color="blue-grey-lighten-5" prepend-inner-icon="mdi-book-open-page-variant-outline" variant="outlined" :items="[10,15,30]" density="compact" class="mb-1"  hide-details></v-select>

        </v-col>
        <v-col md="4">
            <v-text-field bg-color="blue-grey-lighten-5" @update:model-value="onSearch" variant="outlined" v-model="search" density="compact" class="mb-1" clearable hide-details placeholder="Recherche..." color="grey" type="search"></v-text-field>
        </v-col>
    </v-row>
    <v-table density="compact" v-bind="$attrs" hover class="border border-md rounded d-block border-primary rounded-t-lg">
        <tr>
            <td :colspan="headers.length">
                <v-progress-linear height="5" :active="loading" color="secondary" indeterminate></v-progress-linear></td>
        </tr>
        <tr v-if="data.length==0">
            <td :colspan="headers.length">
                <div class="text-center cursor-pointer">Aucune donnée</div>
            </td>
        </tr>
    <thead class="elevation-2">
        <tr>
            <template v-for="item,i in headers">
                <th class="bg-primary-darken-1" :class="{'rounded-ts-lg': i===0, 'rounded-te-lg': i===headers.length-1, [item.class]: true}">
                   <template v-if="item.sortable">
                    <v-btn  v-ripple @click="toggleDirection(item)" variant="text" class="font-weight-medium" color="grey-lighten-1">
                    {{ item.title }}
                    <template v-slot:append>
                        <div>
                            <div class="d-block">
                                <v-icon :color="item.sort == Direction.Asc ? 'white' : ''">mdi-chevron-up</v-icon>
                            </div>
                            <div class="d-block">
                                <v-icon :color="item.sort == Direction.Desc ? 'white' : ''">mdi-chevron-down</v-icon>
                            </div>
                       </div>
                       
                    </template>

                    </v-btn>
                   </template>
                    <span class="text-grey-lighten-1 text-uppercase font-weight-medium" v-else>{{ item.title }}</span>
                </th>
            </template>
        </tr>
    </thead>
    <tbody>
        <template v-for="item in data[0]?.$response?.data.data">
            <tr>
                <template v-for="head in headers">
                    <td :class="{[head.class]: true}" :width="head.width">

                        <slot v-if="!$slots[head.value]" :name="head.value">{{ item[head.value] }}</slot>
                        <slot v-if="$slots[head.value]" :name="head.value" v-bind="{item: item, data: data[0].$response?.data.data}"></slot>
                    </td>
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
                active-color="primary"
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