import React from "react";
import { PieChart } from "@mui/x-charts";
import useIngredientStore from "../../stores/ingredientStore";

const IngredientPieChart: React.FC = (props) => {

  const {
    selectedIngredient,
    decimalData
  } = useIngredientStore();

  let pieChartData: any = [];

  if (selectedIngredient) {
    const protein = Number(decimalData.protein);
    const carbs = Number(decimalData.carbs);
    const fats = Number(decimalData.fats);
    const total = Number(protein + carbs + fats);
    const percent_protein = Number((protein / total) * 100);
    const percent_carbs = Number((carbs / total) * 100);
    const percent_fats = Number((fats / total) * 100);
    pieChartData = [
      { name: "Protein", value: Number(percent_protein), label: "Protein %", color: '#2CB37A' },
      { name: "Carbs", value: Number(percent_carbs), label: "Carbs %", color: '#FBA700' },
      { name: "Fats", value: Number(percent_fats), label: "Fats %", color: '#DC0502' },
    ];
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        scale: '65%'
      }}
    >
      <PieChart
        series={[
          {
            data: pieChartData,
            highlightScope: { faded: "series", highlighted: "item" },
            faded: { innerRadius: 30, additionalRadius: -30 },
            innerRadius: 30,
            outerRadius: 100,
            paddingAngle: 1,
            cornerRadius: 5,
            startAngle: 0,
            endAngle: 360,
            cx: 150,
            cy: 105,
          },
        ]}
        height={220}
        width={370}
        margin={{ bottom: -30 }}
        tooltip={{ trigger: "item" }}
      />
    </div>
  );
};

export default IngredientPieChart;