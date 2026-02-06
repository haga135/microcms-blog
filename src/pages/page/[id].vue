<script setup lang="ts">
import { MicroCMSQueries } from 'microcms-js-sdk';

const route = useRoute()
const page = Number(route.params.id || 1)
const limit = 2
const queries: MicroCMSQueries = {
    limit: limit,
    offset: (page - 1) * limit,
}

const { data: posts } = await useFetch('/api/postList', { params: queries })

const numPages = Math.ceil(posts.value.totalCount / limit)

</script>

<template>
    
    <Home :page="page" />
    
</template>

<style scoped>
@media (min-width: 1160px) {
    .divider {
        display: flex;
        justify-content: space-between;
        width: 1080px;
        margin: 20px auto 0;
        padding-top: 84px;
    }
    .container {
        width: 600px;
    }

    .aside {
        width: 300px;
    }
}

@media (min-width: 820px) and (max-width: 1160px) {
    .divider {
        margin: 20px auto 0;
        width: 740px;
        padding-top: 112px;
    }

    .aside {
        margin-top: 60px;
    }
}


@media (max-width: 820px) {
    .divider {
        margin: 20px 0 0;
        padding: 0 20px;
        padding-top: 112px;
    }

    .aside {
        margin-top: 60px;
        width: 100%;
    }
}
</style>