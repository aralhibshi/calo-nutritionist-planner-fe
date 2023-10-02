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
        { name: "Protein", value: Number(percent_protein), label: "Protein", color: '#57AE7F' },
        { name: "Carbs", value: Number(percent_carbs), label: "Carbs", color: '#F29C38' },
        { name: "Fats", value: Number(percent_fats), label: "Fats", color: '#D3302F' },
      ];
    } else {
      pieChartData = [
        { name: "Protein", value: Number(0.001), label: "Protein", color: '#57AE7F' },
        { name: "Carbs", value: Number(0.001), label: "Carbs", color: '#F29C38' },
        { name: "Fats", value: Number(0.001), label: "Fats", color: '#D3302F' },
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
    <PieChart
      sx={{
        fontWeight: 'bold',
        scale: '68%',
        translate: '0 -15px',
        height: '100%'
      }}
      series={[
        {
          arcLabel: customArcLabel,
          data: pieChartData,
          highlightScope: { faded: "series", highlighted: "item" },
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
  );
};

export default IngredientPieChart;