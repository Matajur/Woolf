import * as Yup from 'yup';

export const recipeValidationSchema = Yup.object().shape({
  recipeName: Yup.string().required('Recipe name is required'),
  description: Yup.string().max(200, 'Description cannot be more than 200 words').required('Description is required'),
  categoryId: Yup.string().required('Category is required'),
  ingredients: Yup.array()
    .of(
      Yup.object().shape({
        ingredient: Yup.string().required('Ingredient is required'),
        quantity: Yup.number().required('Quantity is required').positive(),
      })
    )
    .min(1, 'At least one ingredient is required'),

  time: Yup.number().min(1, 'Time should be at least 1 minute').required('Preparation time is required'),
  instruction: Yup.string().max(200, 'Instruction cannot be more than 200 words').required('Instruction is required'),
});
