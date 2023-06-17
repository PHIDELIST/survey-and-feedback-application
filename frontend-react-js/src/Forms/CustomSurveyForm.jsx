import React from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  questions: Yup.array()
    .of(
      Yup.object().shape({
        text: Yup.string().required('Question text is required'),
        type: Yup.string().required('Question type is required'),
        choices: Yup.array().when('type', {
          is: (val) => ['multiple_response', 'yes_no'].includes(val),
          then: Yup.array().min(1, 'At least one choice is required'),
        }),
      })
    )
    .min(1, 'At least one question is required'),
});

function CustomSurveyForm({ survey, onSubmit }) {
  const { register, handleSubmit, errors } = useForm({
    validationSchema,
  });

  const handleFormSubmit = (data) => {
    onSubmit(data);
  };

  return (
    <div>
      <h2>{survey.title}</h2>
      <p>{survey.description}</p>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        {survey.questions.map((question, index) => (
          <div key={index}>
            <label>Question {index + 1}</label>
            <input
              type="text"
              name={`questions[${index}].text`}
              ref={register}
              defaultValue={question.text}
            />
            {errors.questions && errors.questions[index] && (
              <p>{errors.questions[index].text?.message}</p>
            )}

            {question.type === 'yes_no' && (
              <div>
                <label>
                  <input type="radio" name={`questions[${index}].answer`} value="yes" ref={register} />
                  Yes
                </label>
                <label>
                  <input type="radio" name={`questions[${index}].answer`} value="no" ref={register} />
                  No
                </label>
              </div>
            )}

            {question.type === 'multiple_response' && (
              <div>
                {question.choices.map((choice, choiceIndex) => (
                  <div key={choiceIndex}>
                    <input type="checkbox" name={`questions[${index}].choices[${choiceIndex}].checked`} ref={register} defaultChecked={choice.checked}
                    />
                    <label>{choice.text}</label>
                  </div>
                ))}
              </div>
            )}

            {question.type === 'text_input' && (
              <textarea name={`questions[${index}].answer`} ref={register} defaultValue={question.answer}></textarea>
            )}
          </div>
        ))}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default CustomSurveyForm;
