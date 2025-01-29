import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, IToDo, toDoState } from "./atoms";
import styled from "styled-components";

const InputDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px 5px;
  gap: 15px;
`;

const Btn = styled.button`
  margin-left: auto;
  border-radius: 5px;
  border: none;
  height: 20px;
  width: 60px;
`;
export interface IForm {
  toDo: string;
}
export function CreateToDo() {
  const setToDos = useSetRecoilState(toDoState);
  const nowCategory = useRecoilValue(categoryState);

  const { register, handleSubmit, setError, setValue } = useForm<IForm>();

  const onValid = ({ toDo }: IForm) => {
    if (toDo.trim() === "") {
      setError(
        "toDo",
        { message: "할 일을 작성하세요" },
        { shouldFocus: true }
      );
      setValue("toDo", "");
    } else {
      setToDos((prev) => [
        {
          text: toDo,
          category: nowCategory,
          id: Date.now(),
        },
        ...prev,
      ]);
      setValue("toDo", "");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onValid)}
      style={{ display: "flex", flexDirection: "column" }}
    >
      <InputDiv>
        <input
          {...register("toDo", {
            required: true,
          })}
          placeholder="ToDo"
        />
        {/* <span style={{ color: "tomato", padding: "2px", fontSize: "15px" }}>
        {errors?.toDo?.message}
      </span> */}
        <Btn>Add</Btn>
      </InputDiv>
    </form>
  );
}
