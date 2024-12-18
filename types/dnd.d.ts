namespace Dnd {
    declare enum Type {
        Container = 'container',
        TagClassFromContainer = 'tag-class-from-container',
        TagClassFromFilter = 'tag-class-from-filter',
        TagClassArea = 'tag-class-area',
    }

    declare type TagClassFromContainerData = {
        type: Type
        tagClass: TagClass
    }

    declare type TagClassFromFilterData = {
        type: Type
        tagClass: TagClass
    }

    declare type TagClassAreaData = {
        type: Type
        tagAreaId: number
        tagClass?: TagClass
    }
}
