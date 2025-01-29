import { useRecoilState, useRecoilValue } from "recoil";
import { Categories, categoryState, toDoSelector } from "./atoms";
import { CreateToDo } from "./CreateToDo";
import { ToDo } from "./ToDo";
import styled from "styled-components";

const Title = styled.span`
  font-size: 25px;
`;

const Ul = styled.ul`
  padding: 0px 5px;
`;
const Span = styled.span`
  padding: 0px 5px;
`;
export function ToDoList() {
  const [nowState] = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as Categories);
  };
  return (
    <div>
      <Title>To Dos</Title>
      <hr />

      <select value={category} onInput={onInput}>
        <option value={Categories.TO_DO}>To Do</option>
        <option value={Categories.DOING}>Doing</option>
        <option value={Categories.DONE}>Done</option>
      </select>

      <CreateToDo />
      {nowState.length === 0 ? (
        category === Categories.TO_DO ? (
          <Span> todo가 없습니다</Span>
        ) : category === Categories.DOING ? (
          <Span> doing이 없습니다</Span>
        ) : category === Categories.DONE ? (
          <Span> done이 없습니다</Span>
        ) : null
      ) : (
        <Ul>
          <h1>{category}</h1>
          <hr />
          {nowState.map((toDo) => (
            <ToDo key={toDo.id} {...toDo} />
          ))}
        </Ul>
      )}
    </div>
  );
}
