import * as yup from 'yup';

export const HomeSchema = yup.object().shape({
  userQuantity: yup
    .number()
    .typeError('Số lượng phải là số')
    .required('Vui lòng nhập số người chơi')
    .positive()
    .integer()
    .min(2, 'Vui lòng nhập số người chơi từ 2 đến 4')
    .max(4, 'Vui lòng nhập số người chơi từ 2 đến 4'),
});

export const EnterNameSchema = yup.object().shape({
  userName1: yup.string().defined('Vui lòng nhập tên người chơi').nullable(true),
  userName2: yup.string().defined('Vui lòng nhập tên người chơi').nullable(true),
  userName3: yup.string().defined('Vui lòng nhập tên người chơi').nullable(true),
  userName4: yup.string().defined('Vui lòng nhập tên người chơi').nullable(true),
});
