import Vue from "vue";
import VueRouter from "vue-router";
import CarTrade from "../views/CarTrade";
import Events from "../views/Events";
import GlobeInfo from "../views/GlobeInfo";
import Od from "../views/Od";
import Demo from "../views/Demo";

Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		name: "globeInfo",
		component: GlobeInfo,
	},
	{
		path: "/carTrade",
		name: "carTrade",
		component: CarTrade,
	},
	{
		path: "/events",
		name: "events",
		component: Events,
	},
	{
		path: "/demo",
		name: "demo",
		component: Demo,
	},

	{
		path: "/od",
		name: "od",
		component: Od,
	},
];

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes,
});

export default router;
