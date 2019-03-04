import getTestTask from './get-test-task';
import Task from '../class/task';

const getTestTaskList = (amount) => {
  const array = new Array(amount).fill(1);
  return array.map((_el, index) => {
    const task = new Task(getTestTask());
    task.index = index;
    return task;
  });
};

export {getTestTask, getTestTaskList};
