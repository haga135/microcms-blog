<script setup lang="ts">
import { MicroCMSQueries } from 'microcms-js-sdk';
import { BLOG_PER_PAGE } from '../settings/siteSettings';

type Props = {
    page: number,
    tagId?: string

}

const { page, tagId } = defineProps<Props>()

const limit =  BLOG_PER_PAGE
const queries: MicroCMSQueries = {
    limit: limit,
    offset: (page - 1) * limit,
}

if (tagId) {
    queries.filters = `tag[contains]${tagId}`
}

const { data: posts } = await useFetch('/api/postList', { params: queries })
const { data: tags } = await useFetch('/api/tagList')

const numPages = Math.ceil(posts.value.totalCount / limit)

</script>

<template>
    <div>
        <div class="divider">
            <section class="container">
                <!-- 記事一覧 -->
                <PostList :posts="posts.contents" />
            </section>
            <aside class="aside">
                <!-- キーワード検索、タグ一覧 -->
                <SearchForm />
                <Tags :tags="tags.contents" :selectedTagId="tagId" />
            </aside>
        </div>
        <Pagination :numPages="numPages" :current="page" :selectedTagId="selectedTagId" />
    </div>
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