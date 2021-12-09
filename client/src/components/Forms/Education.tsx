import Button from './Elements/Buttons/Button';
import TextInput from './Elements/Inputs/TextInput';
import SelectInput from './Elements/Inputs/SelectInput';
import TextAreaInput from './Elements/Inputs/TextAreaInput';
import { Education } from '../../interfaces/CategoriesInterface';
import { useHandleForm } from '../../utils/CustomHooks';
import { useTypedSelector } from '../../utils/useTypeSelector';

export default function EducationForm({
  recordType,
  id,
}: {
  recordType: string;
  id: string;
}) {
  const {
    education: { education },
  } = useTypedSelector(state => state);

  const setInitialState = (): Education => {
    const educationFiltered = education.find(educ => educ.id === id);
    const emptyEducation = {
      degree: '',
      school: '',
      city: '',
      country: '',
      beginMonth: '',
      beginYear: '',
      endMonth: '',
      endYear: '',
    };
    return educationFiltered ? educationFiltered : emptyEducation;
  };

  const { state, handleForm, handleSubmit, toggle } = useHandleForm(
    '/education',
    setInitialState(),
    'POST_EDUCATION',
    'UPDATE_EDUCATION'
  );
  //@ts-ignore => this is annoying how can I define one of the types if its or?
  const educ: Education = { ...(state as Education) };

  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const years = Array.from({ length: 20 }, (v, i) => i + 2000); //Generate and array with values from 2000 to 2020

  return (
    <div className="m-auto text-center w-auto h-auto bg-primary rounded-lg">
      <h3>Add Education</h3>
      <form>
        <TextInput
          callback={handleForm}
          type="text"
          name="degree"
          value={educ.degree}
          placeholder="Degree/Field Of Study"
          label="Degree"
        />
        <TextInput
          callback={handleForm}
          type="text"
          name="school"
          value={educ.school}
          placeholder="School/University"
          label="School/University"
        />
        <div
          id="education_form_location"
          className="md:flex gap-5 items-center"
        >
          <TextInput
            callback={handleForm}
            type="text"
            name="city"
            value={educ.city ? educ.city : ''}
            placeholder="City"
            label="City"
          />
          <TextInput
            callback={handleForm}
            type="text"
            name="country"
            value={educ.country ? educ.country : ''}
            placeholder="Country"
            label="Country"
          />
        </div>
        <div
          id="education_form_dates"
          className="flex flex-row gap-2 w-full justify-around mt-8"
        >
          <div className="flex flex-row gap-2 w-full justify-around items-center">
            <p className="text-primary-bg font-bold	">From: </p>
            <SelectInput
              callback={handleForm}
              value={educ.beginMonth}
              name="beginMonth"
              options={months}
              default={'Month'}
            />
            <SelectInput
              callback={handleForm}
              value={educ.beginYear}
              name="beginYear"
              options={years}
              default={'Year'}
            />
          </div>
          <div className="flex flex-row gap-2 w-full justify-around items-center">
            <p className="text-primary-bg font-bold	">To: </p>
            <SelectInput
              callback={handleForm}
              value={educ.endMonth}
              name="endMonth"
              options={months}
              default={'Month'}
            />
            <SelectInput
              callback={handleForm}
              value={educ.endYear}
              name="endYear"
              options={years}
              default={'Year'}
            />
          </div>
        </div>
        <TextAreaInput
          type="text"
          name="description"
          value={educ.description ? educ.description : ''}
          placeholder=""
          label="Description"
          callback={handleForm}
        />
      </form>
      <div className="flex flex-row my-5 gap-2.5">
        <Button name="Cancel" callback={() => toggle(false, '')} />
        <Button
          name={recordType === 'NEW' ? 'Create' : 'Edit'}
          callback={() => handleSubmit(recordType, id)}
        />
      </div>
    </div>
  );
}
