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
            },
            children: [
                {path: "", redirect: {name: "MyPlaylist"}},
                {
                    path: "my_playlist",
                    name: "MyPlaylist",
                    component: () => import("@/components/my_music/MyPlaylist.vue")
                },
                {
                    path: "u_artists",
                    name: "UserArtists",
                    component: () => import("@/components/my_music/UserArtists.vue")
                },
            ]
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
        },
        {
            path: "/user/home",
            name: "UserHome",
            components: {
                SecondaryTabBar: () => import("@/components/tabbar/DefaultSecondaryTabBar.vue"),
                default: () => import("@/main_views/UserHome.vue")
            }
        },
        {
            path: "/user/level",
            name: "UserLevel",
            components: {
                SecondaryTabBar: () => import("@/components/tabbar/DefaultSecondaryTabBar.vue"),
                default: () => import("@/main_views/UserLevel.vue")
            }
        },
        {
            path: "/user/follow",
            name: "UserFollow",
            components: {
                SecondaryTabBar: () => import("@/components/tabbar/DefaultSecondaryTabBar.vue"),
                default: () => import("@/main_views/UserFollow.vue")
            }
        },
        {
            path: "/user/followed",
            name: "UserFans",
            components: {
                SecondaryTabBar: () => import("@/components/tabbar/DefaultSecondaryTabBar.vue"),
                default: () => import("@/main_views/UserFans.vue")
            }
        },
        {
            path: "/user/event",
            name: "UserEvent",
            components: {
                SecondaryTabBar: () => import("@/components/tabbar/DefaultSecondaryTabBar.vue"),
                default: () => import("@/main_views/UserEvent.vue")
            }
        }
    ]
});
export default router;
