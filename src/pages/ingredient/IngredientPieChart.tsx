import React from "react";
import { PieChart } from "@mui/x-charts";
import useIngredientStore from "../../stores/ingredientStore";

const IngredientPieChart: React.FC = (props) => {

  const {
    selectedIngredient,
    editData
  } = useIngredientStore();

  let pieChartData: any = [];

  if (selectedIngredient) {
    if (editData.protein + editData.carbs + editData.fats > 0.003) {
      const protein = Number(editData.protein);
      const carbs = Number(editData.carbs);
      const fats = Number(editData.fats);
      const total = Number(protein + carbs + fats);
      const percent_protein = Number((protein / total) * 100).toFixed(3);
      const percent_carbs = Number((carbs / total) * 100).toFixed(3);
      const percent_fats = Number((fats / total) * 100).toFixed(3);
      pieChartData = [
        { name: "Protein", value: Number(percent_protein), label: "Protein", color: '#2CB37A' },
        { name: "Carbs", value: Number(percent_carbs), label: "Carbs", color: '#FBA700' },
        { name: "Fats", value: Number(percent_fats), label: "Fats", color: '#DC0502' },
      ];
    } else {
      pieChartData = [
        { name: "Protein", value: Number(0.001), label: "Protein", color: '#2CB37A' },
        { name: "Carbs", value: Number(0.001), label: "Carbs", color: '#FBA700' },
        { name: "Fats", value: Number(0.001), label: "Fats", color: '#DC0502' },
      ];
    }
  }

  const customArcLabel = (item: any) => {
    if (item.value > 9.999) {
      const tooltipValue = item.value.toFixed(0);
      const unit = '%'
      return `${tooltipValue}${unit}`;
    } else {
      return '';
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        scale: '65%'
      }}
    >
      <PieChart
        sx={{
          fontWeight: 'bold',
        }}
        series={[
          {
            // arcLabel: (item) => item.value > 9.999 ? `${item.value.toFixed(0)}%`: '',
            arcLabel: customArcLabel,
            data: pieChartData,
            highlightScope: { faded: "series", highlighted: "item" },
            // faded: { innerRadius: 30, additionalRadius: -30 },
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