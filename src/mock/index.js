import getTestTask from './get-test-task';

const getTestTaskList = (amount) => {
  const array = new Array(amount).fill(1);
  return array.map((_el) => {
    return getTestTask();
  });
};

export {getTestTask, getTestTaskList};
