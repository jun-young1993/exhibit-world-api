import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import { Exhibit } from "../entities/exhibit.entity";

export class CreateExhibitDto {
  name?: Exhibit['name']
  isPublic?: Exhibit['isPublic']
}
