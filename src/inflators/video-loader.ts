import { HubsWorld } from "../app";
import { MediaVideo } from "../bit-components";
import { ProjectionMode } from "../utils/projection-mode";
import { inflateMediaLoader } from "./media-loader";
import { VIDEO_FLAGS } from "./video";

export interface VideoLoaderParams {
  src: string;
  projection: ProjectionMode;
  autoPlay: boolean;
  controls: boolean;
  loop: boolean;
}

export function inflateVideoLoader(world: HubsWorld, eid: number, params: VideoLoaderParams) {
  inflateMediaLoader(world, eid, {
    src: params.src,
    recenter: false,
    resize: false,
    animateLoad: false,
    isObjectMenuTarget: false
  });

  const { autoPlay, controls, loop, projection } = params;
  autoPlay && (MediaVideo.flags[eid] |= VIDEO_FLAGS.AUTOPLAY);
  loop && (MediaVideo.flags[eid] |= VIDEO_FLAGS.LOOP);
  controls && (MediaVideo.flags[eid] |= VIDEO_FLAGS.CONTROLS);
  if (projection === ProjectionMode.SPHERE_EQUIRECTANGULAR) {
    MediaVideo.flags[eid] |= VIDEO_FLAGS.PROJECTION_EQUIRECT;
  } else {
    MediaVideo.flags[eid] |= VIDEO_FLAGS.PROJECTION_FLAT;
  }
}
