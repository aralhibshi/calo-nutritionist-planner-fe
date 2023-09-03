import React from "react";
import { PieChart } from "@mui/x-charts";
import { IIngredientData } from "../../interfaces";

// Ingredient Detail Modal Props Interface
interface IIngredientDetailModalProps {
  ingredient: null | IIngredientData;
}

const IngredientDetailModal: React.FC<IIngredientDetailModalProps> = (
  props
) => {

  let pieChartData: any = [];

  if (props.ingredient) {
    const protein = Number(props.ingredient.protein);
    const carbs = Number(props.ingredient.carbs);
    const fats = Number(props.ingredient.fats);
    const total = Number(protein + carbs + fats);
    const percent_protein = Number((protein / total) * 100);
    const percent_carbs = Number((carbs / total) * 100);
    const percent_fats = Number((fats / total) * 100);
    pieChartData = [
      { name: "Protein", value: Number(percent_protein), label: "Protein %" },
      { name: "Carbs", value: Number(percent_carbs), label: "Carbs %" },
      { name: "Fats", value: Number(percent_fats), label: "Fats %" },
    ];
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        scale: '80%'
      }}
    >
      <PieChart
        series={[
          {
            data: pieChartData,
            highlightScope: { faded: "global", highlighted: "item" },
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

export default IngredientDetailModal;