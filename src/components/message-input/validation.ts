import { object, string } from "yup";
import { checkIsCityName, checkIsIncludedInCityList, checkIsValid } from "../../helpers";

export default object({
  message: string()
    .matches(/^[А-Яа-яЁё\s-]+$/i, 'пожалуйста, используйте кириллицу')
    .required('пожалуйста, используйте кириллицу')
    .test('check is city name', 'неверный ответ',value => checkIsCityName(value))
    .test('included last letter ', 'ответ не является русским названием города',value => checkIsValid(value))
    .test('included in city list', 'пожалуйста, напишите название города, которое не использовалось',value => checkIsIncludedInCityList(value)),
});