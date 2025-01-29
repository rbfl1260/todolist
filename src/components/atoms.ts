import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "toDoLocal",
  storage: localStorage,
});

export enum Categories {
  "TO_DO" = "TO_DO",
  "DOING" = "DOING",
  "DONE" = "DONE",
}

export interface IToDo {
  text: string;
  id: number;
  category: Categories;
}

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
  effects_UNSTABLE: [persistAtom],
});
//카테고리 구분 없이 한번에 다 저장

export const categoryState = atom<Categories>({
  key: "category",
  default: Categories.TO_DO,
});
//카테고리 구분, 현재 카테고리 또한 반영됨

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    return [toDos.filter((toDo) => toDo.category === category)];
  },
});
//선택된 카테고리에 따라 전체 카테고리 필터링
