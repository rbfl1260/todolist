import styled from "styled-components";
import { Categories, IToDo, toDoState } from "./atoms";
import { useSetRecoilState } from "recoil";
import React from "react";

const Div = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 20px;
  margin-left: 5px;
`;
const BtnDiv = styled.div`
  margin-top: 5px;
  display: flex;
  gap: 15px;
`;
const Btn = styled.button`
  border-radius: 5px;
  border: none;
  background-color: #616f83;
  color: white;
  height: 20px;
  width: 60px;
  &:hover {
    cursor: pointer;
  }
`;
const DelBtn = styled(Btn)`
  background-color: transparent;
  height: auto;
  width: auto;
`;

export function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;

    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const newToDos = [...oldToDos];
      if (name === "Del") {
        // return [
        //   ...oldToDos.slice(0, targetIndex),
        //   ...oldToDos.slice(targetIndex + 1),
        // ];
        newToDos.splice(targetIndex, 1);
        return newToDos;
      } else {
        const newToDo = { text, category: name as Categories, id };

        return [
          ...oldToDos.slice(0, targetIndex),
          newToDo,
          ...oldToDos.slice(targetIndex + 1),
        ];
      }
    });
  };

  return (
    <li>
      <Div>
        <span>{text}</span>

        <BtnDiv>
          {category !== Categories.TO_DO && (
            <Btn name={Categories.TO_DO} onClick={onClick}>
              To Do
            </Btn>
          )}
          {category !== Categories.DOING && (
            <Btn name={Categories.DOING} onClick={onClick}>
              Doing
            </Btn>
          )}
          {category !== Categories.DONE && (
            <Btn name={Categories.DONE} onClick={onClick}>
              Done
            </Btn>
          )}
          <DelBtn name="Del" onClick={onClick}>
            ❌
          </DelBtn>
        </BtnDiv>
      </Div>
    </li>
  );
}
