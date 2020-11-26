// import clzwTimg01 from "@/assets/images-event/clzw/timg01.jpg";
let clzwTimg01 = require("@/assets/images-event/clzw/timg01.jpg");
import clzwTimg02 from "@/assets/images-event/clzw/timg02.jpg";
import clzwTimg03 from "@/assets/images-event/clzw/timg03.jpg";
import clzwTimg04 from "@/assets/images-event/clzw/timg04.jpg";
import clzwTimg05 from "@/assets/images-event/clzw/timg05.jpg";

import dlsgTimg01 from "@/assets/images-event/dlsg/timg01.jpg";
import dlsgTimg02 from "@/assets/images-event/dlsg/timg02.jpg";
import dlsgTimg03 from "@/assets/images-event/dlsg/timg03.jpg";
import dlsgTimg04 from "@/assets/images-event/dlsg/timg04.jpg";
import dlsgTimg05 from "@/assets/images-event/dlsg/timg05.jpg";

import dltfTimg01 from "@/assets/images-event/dltf/timg01.jpg";
import dltfTimg02 from "@/assets/images-event/dltf/timg02.jpg";
import dltfTimg03 from "@/assets/images-event/dltf/timg03.jpg";
import dltfTimg04 from "@/assets/images-event/dltf/timg04.jpg";
import dltfTimg05 from "@/assets/images-event/dltf/timg05.jpg";

// åª’ä½“
import video02 from "@/assets/video/video_02.mp4";
import video03 from "@/assets/video/video_03.mp4";
import video04 from "@/assets/video/video_04.mp4";

const imgList = {
	clzw: [clzwTimg01, clzwTimg02, clzwTimg03, clzwTimg04, clzwTimg05],
	dlsg: [dlsgTimg01, dlsgTimg02, dlsgTimg03, dlsgTimg04, dlsgTimg05],
	dltf: [dltfTimg01, dltfTimg02, dltfTimg03, dltfTimg04, dltfTimg05],
};

export const typeToUrls = {
	1: imgList.dlsg,
	2: imgList.dltf,
	3: imgList.clzw,
	4: imgList.dltf,
	5: imgList.dlsg,
};

export const videoSrc = {
	1: video02,
	2: video03,
	3: video04,
};
