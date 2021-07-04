import { TodoType } from '@/types/TodoType';
import * as C from 'chance';
import * as R from 'ramda';

const c = new C.Chance();

const COLORS = ['red', 'blue', 'grey', 'yellow', 'green'];

/**
 * todo 요소를 생성한다
 *
 * @return  {TodoType}[return description]
 */
export const makeTodo = (isDone: boolean): TodoType => ({
  id: c.fbid(),
  // isDone: [false, true][Math.floor(Math.random() * 10) % 2], // 랜덤 생성 true or false
  isDone, // 랜덤 생성 true or false
  color: COLORS[Math.floor(Math.random() * 10) % 5], // 랜던 생성
  content: c.paragraph(),
  atWritten: ((d: Date) =>
    `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`)(c.date()),
});

/**
 * 파라미터 개수 만큼 todo 만들어 리턴
 *
 * @param   {number[]}    max  [max description]
 * @return  {TodoType[]}       [return description]
 */
export const makeTodoList = (max: number, status: string): TodoType[] =>
  R.range(1, max + 1).map(() => makeTodo(status === 'DONE'));
