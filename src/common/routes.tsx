import {lazy} from "solid-js";
import {RouteDefinition} from "@solidjs/router";

export const routes: RouteDefinition[] = [
  {
    path: "/",
    component: lazy(() => import("../components/home/home.component"))
  },
  {
    path: "/orders",
    component: lazy(() => import("../components/order/order-list/order-list.component"))
  },
  {
    path: "/catalog/items",
    component: lazy(() => import("../components/catalog/catalog-list/catalog-list.component"))
  },
  {
    path: "/settings/user-profile",
    component: lazy(() => import("../components/settings/user-profile/user-profile.component"))
  },
  {
    path: "*404",
    component: lazy(() => import("../components/notFound/notFound.component"))
  }
];