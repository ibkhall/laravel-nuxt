<script setup lang="ts">
import { VDataTableServer } from 'vuetify/labs/VDataTable'
import { Model } from '../models/Model';

const {$emitter} = useNuxtApp()
enum Direction {
  Asc = 'asc',
  Desc = 'desc',
  None = ''
}

const options = reactive<{page: number, itemsPerPage: number}>({page: 1, itemsPerPage: CONSTANT.PAGINATION_LIMIT})
const total = ref(0)
const props = defineProps<{
    headers: Array<any>,
    model: Model,
    relations?: Array<string>,
}>()

const items = ref([])

const paginationLength = ref(0)
const search = ref('')
const loading = ref(true)

props.headers.forEach(el => {
    if(el.sortable) {
        el.sort = Direction.None
    }
})

const fresh = (r: {page: number, per_page: number, pagination_length: number, items: [], total: number}) => {
    options.page = r.page
    options.itemsPerPage = r.per_page
    paginationLength.value = r.pagination_length
    items.value = r.items
    total.value = r.total
    loading.value = false
}
onMounted(async () => {
    fresh(useApiResult(await props.model.$query().with(props.relations ?? []).search(CONSTANT.PAGINATION_LIMIT)))

})

$emitter.on(CONSTANT.REFRESH_DATATABLE as never, async () => {
         fresh(useApiResult(await props.model.$query().with(props.relations ?? []).lookFor(search.value).search(options.itemsPerPage,options.page)))
    })


const onPageChange = async (p: number) => {
   
    loading.value = true
    fresh(useApiResult(await props.model.$query().with(props.relations ?? []).lookFor(search.value).search(options.itemsPerPage,p)))
    

}

const onSearch = async (value: string) => {
    loading.value = true
    fresh(useApiResult(await props.model.$query().with(props.relations ?? []).lookFor(value).search(options.itemsPerPage,options.page)))
   
}

const onPerPage = async (value: number) => {
    loading.value = true
    fresh(useApiResult(await props.model.$query().with(props.relations ?? []).lookFor(search.value).search(value,options.page)))
    
}

const toggleDirection = async (item: any) => {

    if(item.length) {
        loading.value = true
        fresh(useApiResult(await props.model.$query()
            .with(props.relations ?? [])
            .sortBy(item[0].key, item[0].order)
            .lookFor(search.value)
            .search(options.itemsPerPage, options.page)))
    }else {
        loading.value = true
        fresh(useApiResult(await props.model.$query()
            .with(props.relations ?? [])
            .lookFor(search.value)
            .search(options.itemsPerPage, options.page)))
    }
    
}

const selected = ref([])
</script>
<template>

    <VDataTableServer
        v-model:page="options.page"
        density="compact"
        :search="search"
        hide-default-footer
        class="elevation-1 rounded-t-lg"
        :items-per-page="options.itemsPerPage"
        :headers="props.headers"
        :items="items"
        :items-length="total"
        v-bind="$attrs"
        @update:sortBy="toggleDirection"
        @update:options="options = $event"
        :loading="loading"
        v-model="selected"
    >
    <template v-slot:top>
        <v-row align="center" class="mx-1">
            <v-col md="3">
                <v-text-field 
                @update:model-value="onSearch" 
                v-model="search" 
                density="compact" 
                class="mb-1 mt-2" 
                clearable 
                hide-details 
                placeholder="Recherche..." 
                type="search"
                >
                <template v-slot:prepend-inner>
                    <Icon size="1.3rem" name="carbon:search"/>
                </template>
            </v-text-field>
            </v-col>
            <v-col md="2">
                <v-select 
                @update:model-value="onPerPage" 
                v-model="options.itemsPerPage" 
                hide-details 
                class="mb-1 mt-2" 
                density="compact" 
                :items="[5,10,15, 20, 30, 40, 50]"
                >
                <template v-slot:prepend-inner>
                    <Icon size="1.3rem" name="mdi:book-open-page-variant"/>
                </template>
            </v-select>
            </v-col>
            <v-col md="7" v-if="selected.length">
                <slot name="actions" v-bind="selected"></slot>
                
            </v-col>
        </v-row>

    </template>
            

    <template v-slot:bottom>
      <div class="text-center pt-2">
        <v-pagination
                @update:model-value="onPageChange"
                border
                density="comfortable"
                active-color="primary"
                v-model="options.page"
                :length="paginationLength"
                :total-visible="total"
        ></v-pagination>
      </div>
    </template>
    <template v-for="(index, name) in $slots" v-slot:[name]>
                <slot :name="name"></slot>
    </template>

    <template v-for="(index, name) in $slots" v-slot:[name]="data">
        <slot :name="name" v-bind="data"></slot>
    </template>
    </VDataTableServer>
</template>


<style>
th {
  background-color: lavender !important;
  color: slategray !important;
  font-weight: 600!important;
  
}

</style>