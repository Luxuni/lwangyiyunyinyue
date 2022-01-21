import {createRouter, createWebHistory} from "vue-router";
const router = createRouter ({
    history: createWebHistory (),
    routes: [
        {path: "/", redirect: {name: "Recommend"}},
        {
            path: "/discover",
            name: "Discover",
            component: () => import("@/main_views/DiscoverMusic.vue"),
            children: [
                {path: "", redirect: {name: "Recommend"}},
                {
                    path: "recommend",
                    name: "Recommend",
                    component: () => import("@/main_views/discover_children_views/Recommend.vue")
                },
                {
                    path: "leader",
                    name: "LeaderBoard",
                    component: () => import("@/main_views/discover_children_views/LeaderBoard.vue")
                },
                {
                    path: "list",
                    name: "SingList",
                    component: () => import("@/main_views/discover_children_views/SongList.vue")
                },
                {
                    path: "station",
                    name: "AnchorStation",
                    component: () => import("@/main_views/discover_children_views/AnchorStation.vue")
                },
                {
                    path: "singer",
                    name: "Singer",
                    component: () => import("@/main_views/discover_children_views/Singer.vue")
                },
                {
                    path: "discs",
                    name: "NewDiscs",
                    component: () => import("@/main_views/discover_children_views/NewDiscs.vue")
                }
            ]
        },
        {
            path: "/my",
            name: "MyMusic",
            components: {
                SecondaryTabBar: () => import("@/components/tabbar/DefaultSecondaryTabBar.vue"),
                default: () => import("@/main_views/MyMusic.vue")
            }
        },
        {
            path: "/attention",
            name: "PayAttentionTo",
            components: {
                SecondaryTabBar: () => import("@/components/tabbar/DefaultSecondaryTabBar.vue"),
                default: () => import("@/main_views/PayAttentionTo.vue")
            }
        },
        {
            path: "/mall",
            name: "Mall",
            components: {
                SecondaryTabBar: () => import("@/components/tabbar/DefaultSecondaryTabBar.vue"),
                default: () => import("@/main_views/Mall.vue")
            }
        },
        {
            path: "/musician",
            name: "Musician",
            components: {
                SecondaryTabBar: () => import("@/components/tabbar/DefaultSecondaryTabBar.vue"),
                default: () => import("@/main_views/Musician.vue")
            }
        },
        {
            path: "/app",
            name: "DownloadApps",
            components: {
                SecondaryTabBar: () => import("@/components/tabbar/DefaultSecondaryTabBar.vue"),
                default: () => import("@/main_views/DownloadApps.vue")
            }
        }
    ]
});
export default router;
