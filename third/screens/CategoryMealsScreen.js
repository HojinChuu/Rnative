import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { CATEGORIES, MEALS } from "../data/dummy-data";

import MealItem from "../components/MealItem";

const CategoryMealsScreen = ({ navigation }) => {
  const categoryId = navigation.getParam("categoryId");

  const displayedMeals = MEALS.filter(
    (meal) => meal.categoryIds.indexOf(categoryId) >= 0
  );

  const renderMealItem = (itemData) => {
    return (
      <MealItem
        title={itemData.item.title}
        image={itemData.item.imageUrl}
        duration={itemData.item.duration}
        complexity={itemData.item.complexity}
        affordability={itemData.item.affordability}
        onSelectMeal={() => {
          navigation.navigate({
            routeName: "MealDetail",
            params: {
              mealId: itemData.item.id,
            },
          });
        }}
      />
    );
  };

  return (
    <View style={styles.screen}>
      <FlatList
        data={displayedMeals}
        keyExtractor={(item, index) => item.id}
        renderItem={renderMealItem}
        style={{ width: "100%" }}
      />
    </View>
  );
};

CategoryMealsScreen.navigationOptions = (navigationData) => {
  const categoryId = navigationData.navigation.getParam("categoryId");
  const selectedCategory = CATEGORIES.find(
    (category) => category.id === categoryId
  );
  return {
    headerTitle: selectedCategory.title,
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
});

export default CategoryMealsScreen;
