# Calo Nutritionist Planner: Frontend

The frontend for the Nutritionist Planner, an internal dashboard where nutritionists build meals from ingredients and
components, see each meal's macros, calories and cost, and export their data. It was my internship project at
[Calo](https://calo.app) in 2023, built over about seven weeks with one other engineer
([@moaz-mostafa23](https://github.com/moaz-mostafa23)).

It's a React and TypeScript app using MUI, Formik with Yup, and Zustand, with sign-in through AWS Amplify and
Cognito. It ran against a development deployment on AWS and never went to production users.

The backend is [calo-nutritionist-planner-be](https://github.com/aralhibshi/calo-nutritionist-planner-be). More
about my work is on my [portfolio](https://ahmedalhibshi.dev).

## What it does

- **Ingredients, components and meals** in one dashboard, switched with a dropdown: paginated tables, search by
  name, and create and edit dialogs with validated forms. Components are built from ingredients and meals from
  components, with their macros and calories shown as you build them, and price in the tables.
- **See the impact of an edit before saving it.** Editing an ingredient shows every component and meal that uses
  it, with their new values highlighted, so a nutritionist can see what a change will affect before committing it.
- **Ingredient playground.** A full-screen sandbox for trying out an ingredient's macros and quantities with sliders,
  and seeing the before and after on its components and meals, without changing any data.
- **Data export.** Export meals, components or ingredients; the backend emails the signed-in user a CSV download
  link.
- **Meal images**, uploaded straight to S3 through pre-signed URLs.

## Project structure

```
src/
├── pages/           one folder per entity: ingredient, component, meal (tables, dialogs, charts)
├── components/      shared UI: nav bar, search, pagination
├── stores/          Zustand stores: one per entity, plus search, table, user and notifications
├── network/         API clients, one per entity, on a shared fetch wrapper
├── validation/      Yup schemas for every create and edit form
├── interfaces/      shared types
└── theme/           MUI theme
```

## My part

The work was split by feature, and we both worked across the app. I built:

- the home dashboard, and the ingredient side: the tables, the edit dialog that shows the impact on components and meals, the ingredient
  playground, and the macro charts;
- the data export flow, using the signed-in user's email;
- pagination and search across all three entities, with page sizes that adapt to the screen height;
- category selection for ingredients and components, tooltips, snackbar notifications and loading states;
- most of the layout and styling, and later fixes to the macro and calorie calculations.

My teammate set up the app and Amplify sign-in, built most of the component and meal creation and editing, and
built the meal image upload.

## Stack

React 18, TypeScript, MUI, Formik, Yup, Zustand, React Router, AWS Amplify (Cognito sign-in).

## Running it

This is an archived internship project, kept here as a code sample. To run it against your own deployment of the
backend, you'd need an Amplify configuration
(`src/aws-exports.js`, which Amplify generates and isn't committed) and a `.env` with `REACT_APP_API_BASE_URL`, then:

```bash
npm install
npm start
```
