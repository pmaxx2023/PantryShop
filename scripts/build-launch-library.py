#!/usr/bin/env python3
"""Write lib/launch-library.mjs. Original PShop recipes and ingredients. Not copied from a third party."""
from pathlib import Path

ING = [
    ("onion", "Yellow onion", "each", 1, 0.79, "Produce"),
    ("red_onion", "Red onion", "each", 1, 0.99, "Produce"),
    ("bell_pepper", "Bell pepper", "each", 1, 1.29, "Produce"),
    ("zucchini", "Zucchini", "each", 1, 0.99, "Produce"),
    ("mushrooms", "Mushrooms", "g", 227, 2.49, "Produce"),
    ("avocado", "Avocado", "each", 1, 1.49, "Produce"),
    ("fresh_tomato", "Fresh tomatoes", "g", 500, 2.49, "Produce"),
    ("cucumber", "Cucumber", "each", 1, 0.89, "Produce"),
    ("lettuce", "Lettuce", "g", 300, 1.79, "Produce"),
    ("apple", "Apples", "g", 1000, 2.49, "Produce"),
    ("banana", "Bananas", "each", 5, 1.29, "Produce"),
    ("berries", "Fresh berries", "g", 340, 3.49, "Produce"),
    ("ginger", "Fresh ginger", "g", 80, 1.29, "Produce"),
    ("celery", "Celery", "g", 400, 1.49, "Produce"),
    ("sweet_potato", "Sweet potatoes", "g", 1000, 1.99, "Produce"),
    ("kale", "Kale", "g", 200, 2.29, "Produce"),
    ("parsley", "Fresh parsley", "g", 30, 1.29, "Produce"),
    ("jalapeno", "Jalapeño", "each", 1, 0.39, "Produce"),
    ("eggplant", "Eggplant", "each", 1, 1.79, "Produce"),
    ("cauliflower", "Cauliflower", "g", 700, 2.49, "Produce"),
    ("basil", "Fresh basil", "g", 20, 2.49, "Produce"),
    ("green_beans", "Green beans", "g", 400, 2.29, "Produce"),
    ("eggs", "Eggs", "each", 12, 2.99, "Dairy & chilled"),
    ("milk", "Milk", "ml", 1000, 1.49, "Dairy & chilled"),
    ("butter", "Butter", "g", 227, 3.49, "Dairy & chilled"),
    ("yogurt", "Plain yogurt", "g", 500, 2.29, "Dairy & chilled"),
    ("mozzarella", "Mozzarella", "g", 227, 2.99, "Dairy & chilled"),
    ("feta", "Feta", "g", 200, 3.49, "Dairy & chilled"),
    ("oat_milk", "Oat milk", "ml", 1000, 2.99, "Dairy & chilled"),
    ("coconut_yogurt", "Coconut yogurt", "g", 400, 2.99, "Dairy & chilled"),
    ("ground_beef", "Ground beef", "g", 500, 6.49, "Meat & fish"),
    ("salmon", "Salmon fillets", "g", 400, 9.99, "Meat & fish"),
    ("bacon", "Bacon", "g", 340, 4.99, "Meat & fish"),
    ("turkey", "Ground turkey", "g", 500, 5.49, "Meat & fish"),
    ("shrimp", "Shrimp", "g", 340, 7.99, "Frozen"),
    ("tofu", "Firm tofu", "g", 400, 2.29, "Produce"),
    ("tuna", "Canned tuna in water", "g", 142, 1.29, "Pantry"),
    ("lentils", "Dried brown lentils", "g", 500, 1.49, "Pantry"),
    ("kidney_beans", "Kidney beans, drained", "g", 240, 0.79, "Pantry"),
    ("peanut_butter", "Peanut butter", "g", 454, 2.99, "Pantry"),
    ("oats", "Rolled oats", "g", 500, 1.99, "Pantry"),
    ("quinoa", "Quinoa", "g", 500, 3.49, "Pantry"),
    ("flour", "All-purpose flour", "g", 1000, 1.49, "Pantry"),
    ("breadcrumbs", "Breadcrumbs", "g", 250, 1.49, "Pantry"),
    ("gf_oats", "Certified gluten-free oats", "g", 500, 3.49, "Pantry"),
    ("rice_flour", "Rice flour", "g", 500, 2.49, "Pantry"),
    ("gf_breadcrumbs", "Gluten-free breadcrumbs", "g", 250, 2.49, "Pantry"),
    ("stock", "Vegetable stock", "ml", 1000, 1.49, "Pantry"),
    ("tomato_paste", "Tomato paste", "g", 170, 0.79, "Pantry"),
    ("honey", "Honey", "g", 340, 4.49, "Pantry"),
    ("sugar", "Sugar", "g", 1000, 1.79, "Pantry"),
    ("vinegar", "White vinegar", "ml", 500, 1.19, "Pantry"),
    ("mustard", "Dijon mustard", "g", 200, 1.99, "Pantry"),
    ("salsa", "Tomato salsa", "g", 450, 2.49, "Pantry"),
    ("raisins", "Raisins", "g", 340, 2.49, "Pantry"),
    ("almonds", "Almonds", "g", 200, 3.99, "Pantry"),
    ("walnuts", "Walnuts", "g", 200, 3.99, "Pantry"),
    ("cinnamon", "Cinnamon", "g", 40, 1.49, "Pantry"),
    ("cumin", "Ground cumin", "g", 40, 1.29, "Pantry"),
    ("paprika", "Paprika", "g", 40, 1.29, "Pantry"),
    ("chili_powder", "Chili powder", "g", 40, 1.29, "Pantry"),
    ("oregano", "Dried oregano", "g", 20, 1.19, "Pantry"),
    ("peas", "Frozen peas", "g", 400, 1.29, "Frozen"),
    ("mixed_veg", "Frozen mixed vegetables", "g", 500, 1.49, "Frozen"),
    ("frozen_berries", "Frozen berries", "g", 400, 3.29, "Frozen"),
    ("mayonnaise", "Mayonnaise", "g", 400, 2.49, "Dairy & chilled"),
    ("maple", "Maple syrup", "ml", 250, 4.99, "Pantry"),
]

# Rough per-unit energy used only to label estimates. Not a lab analysis.
KCAL = {
    "g": 1.2, "ml": 0.6, "each": 40,
}
PROTEIN = {"chicken": 0.2, "salmon": 0.2, "shrimp": 0.2, "tuna": 0.23, "eggs": 6, "tofu": 0.12, "lentils": 0.09, "chickpeas": 0.08, "ground_beef": 0.2, "turkey": 0.2}

ALIASES = {
    "onions": "onion", "yellow onion": "onion", "red onions": "red_onion",
    "bell peppers": "bell_pepper", "green pepper": "bell_pepper",
    "zucchinis": "zucchini", "courgette": "zucchini",
    "mushroom": "mushrooms", "avocados": "avocado",
    "tomatoes fresh": "fresh_tomato", "roma tomatoes": "fresh_tomato",
    "cucumbers": "cucumber", "apples": "apple", "bananas": "banana",
    "banana": "banana", "blueberries": "berries", "strawberries": "berries",
    "ginger root": "ginger", "sweet potato": "sweet_potato",
    "jalapeno": "jalapeno", "jalapeño": "jalapeno",
    "egg": "eggs", "whole milk": "milk", "greek yogurt": "yogurt",
    "mozzarella cheese": "mozzarella", "beef mince": "ground_beef", "mince": "ground_beef",
    "salmon fillet": "salmon", "prawns": "shrimp", "shrimps": "shrimp",
    "firm tofu": "tofu", "tuna can": "tuna", "canned tuna": "tuna",
    "brown lentils": "lentils", "kidney bean": "kidney_beans",
    "peanutbutter": "peanut_butter", "rolled oats": "oats", "oatmeal": "oats",
    "ap flour": "flour", "all purpose flour": "flour",
    "veg stock": "stock", "vegetable broth": "stock", "broth": "stock",
    "dijon": "mustard", "frozen peas": "peas", "oatmilk": "oat_milk",
    "maple syrup": "maple", "gf oats": "gf_oats", "rice flour": "rice_flour",
}

def kcal_for(ings):
    total = 0
    protein = 0
    for i, q in ings:
        unit = next(x[2] for x in ING if x[0] == i) if any(x[0] == i for x in ING) else ("g" if i not in ("lemon", "lime", "garlic") else "each")
        # base catalog units are not in ING; approximate grams-like
        if i in ("lemon", "lime", "garlic", "tortillas", "corn_tortillas"):
            total += q * 15
        else:
            total += q * (0.9 if unit == "ml" else 1.1 if unit == "g" else 45)
        if i in PROTEIN:
            protein += q * PROTEIN[i] if PROTEIN[i] < 1 else PROTEIN[i] * (q / 2)
    calories = max(180, min(900, round(total / 2)))  # two servings
    return {"calories": int(calories), "protein": int(max(6, min(60, protein or calories / 25))), "carbs": int(calories * 0.45 / 4), "fat": int(calories * 0.3 / 9)}

RECIPES = []

def add(id, name, desc, cuisine, time, equip, tags, ings, steps):
    assert len(steps) >= 4, id
    assert time <= 60, id
    RECIPES.append({
        "id": id, "name": name, "description": desc, "cuisine": cuisine, "time": time,
        "ingredients": ings, "steps": steps, "equipment": equip, "tags": tags,
        "nutrition": kcal_for(ings),
    })

S = lambda *parts: list(parts)

add("garlic-rice", "Garlic rice", "Fluffy rice with sweet garlic and parsley.", "Comfort food", 25, ["Stove"], ["vegan", "vegetarian", "gluten-free", "dairy-free"],
    [("rice", 160), ("garlic", 3), ("olive_oil", 15), ("salt", 2), ("parsley", 8), ("stock", 400)],
    S("Rinse the rice until the water runs clearer. Thinly slice the garlic.",
      "Warm the olive oil in a saucepan over medium-low heat. Cook the garlic for 30 seconds without browning.",
      "Stir in the rice, salt and stock. Bring to a simmer, cover and cook on low for the time on the rice package, usually 15 minutes.",
      "Rest covered for 5 minutes. Fluff with a fork and stir in the chopped parsley."))

add("lentil-soup", "Weeknight lentil soup", "Brown lentils, carrot, celery and tomato in a simple pot.", "Comfort food", 40, ["Stove"], ["vegan", "vegetarian", "gluten-free", "dairy-free"],
    [("lentils", 200), ("carrots", 150), ("celery", 80), ("onion", 1), ("garlic", 2), ("tomatoes", 200), ("stock", 700), ("olive_oil", 15), ("cumin", 4), ("salt", 3)],
    S("Rinse the lentils. Dice the onion, carrot and celery. Slice the garlic.",
      "Warm the oil in a pot. Cook the onion, carrot and celery for 6 minutes. Stir in the garlic and cumin for 30 seconds.",
      "Add the tomatoes, lentils, stock and salt. Simmer partly covered for 25 minutes until the lentils are tender. Add a splash of water if it thickens too much.",
      "Taste the salt. Ladle into bowls. The lentils should be soft all the way through, not chalky."))

add("tuna-bean-salad", "Tuna and white bean salad", "A cool plate of tuna, beans, parsley and lemon.", "Mediterranean", 15, ["Stove"], ["gluten-free", "dairy-free"],
    [("tuna", 142), ("white_beans", 240), ("parsley", 10), ("lemon", 1), ("olive_oil", 15), ("red_onion", 0.5), ("salt", 1), ("pepper", 1)],
    S("Drain the tuna and the beans. Finely dice the onion and chop the parsley.",
      "Toss the beans, tuna, onion and parsley in a bowl.",
      "Add the olive oil, lemon juice, salt and pepper. Toss again.",
      "Rest 5 minutes so the onion softens. Serve cool. This is not a cooked fish dish; use tuna from a sealed can."))

add("spinach-omelette", "Spinach and cheddar omelette", "Soft eggs with wilted spinach and a little cheddar.", "Comfort food", 15, ["Stove"], ["vegetarian", "gluten-free"],
    [("eggs", 3), ("spinach", 60), ("cheddar", 30), ("butter", 10), ("salt", 1), ("pepper", 1)],
    S("Beat the eggs with salt and pepper. Grate the cheddar.",
      "Melt the butter in a nonstick pan over medium heat. Wilt the spinach for 1 minute and push it aside.",
      "Pour in the eggs. Lift the edges as they set so uncooked egg runs underneath. When the top is still slightly soft, add the cheddar.",
      "Fold and slide onto a plate. Eggs should be set, not raw. Leftovers are best eaten immediately."))

add("sheet-salmon", "Roasted salmon and potatoes", "Salmon fillets and potato wedges on one tray.", "Comfort food", 40, ["Oven"], ["gluten-free", "dairy-free"],
    [("salmon", 300), ("potatoes", 400), ("olive_oil", 20), ("lemon", 1), ("salt", 3), ("pepper", 1), ("parsley", 8)],
    S("Heat the oven to 425°F / 220°C. Cut the potatoes into wedges and toss with half the oil and half the salt.",
      "Roast the potatoes for 15 minutes. Pat the salmon dry and season with the remaining oil, salt and pepper.",
      "Add the salmon to the tray. Roast 12–15 minutes more, until the salmon flakes and the center is opaque, about 145°F / 63°C.",
      "Rest 2 minutes. Finish with lemon and parsley. Refrigerate leftovers the same day and reheat until hot."))

add("tofu-stir", "Ginger tofu and broccoli", "Crisp-edged tofu with broccoli, garlic and tamari-friendly soy.", "Asian", 25, ["Stove"], ["vegan", "vegetarian", "dairy-free"],
    [("tofu", 300), ("broccoli", 250), ("garlic", 2), ("ginger", 10), ("soy_sauce", 20), ("rice", 150), ("olive_oil", 15), ("sesame_oil", 5)],
    S("Press the tofu and cut it into cubes. Cook the rice by the package method. Cut the broccoli into small florets.",
      "Warm the olive oil in a wide pan. Brown the tofu on two sides, then set it aside.",
      "Stir-fry the broccoli, sliced garlic and ginger for 4 minutes with a splash of water. Return the tofu, add the soy sauce and sesame oil, and cook 2 minutes until the broccoli is tender and the tofu is hot.",
      "Serve over the rice. Soy sauce contains wheat unless you later choose the gluten-free tamari adaptation."))

add("beef-pepper-skillet", "Beef and pepper skillet", "Ground beef with onion and bell pepper over rice.", "Comfort food", 30, ["Stove"], ["gluten-free", "dairy-free"],
    [("ground_beef", 300), ("bell_pepper", 2), ("onion", 1), ("garlic", 2), ("paprika", 4), ("salt", 2), ("pepper", 1), ("olive_oil", 10), ("rice", 150)],
    S("Cook the rice by the package method. Dice the onion and peppers. Slice the garlic.",
      "Warm the oil in a skillet. Cook the beef over medium heat, breaking it up, until no pink remains, about 160°F / 71°C. Drain excess fat if you prefer.",
      "Add the onion, peppers, garlic, paprika, salt and pepper. Cook 6–8 minutes until the peppers are tender.",
      "Serve over the rice. Cool leftovers quickly and refrigerate."))

add("turkey-chili", "Turkey and bean chili", "Ground turkey, kidney beans and tomato, spiced and simmered.", "Comfort food", 40, ["Stove"], ["gluten-free", "dairy-free"],
    [("turkey", 350), ("kidney_beans", 240), ("tomatoes", 400), ("onion", 1), ("garlic", 2), ("chili_powder", 8), ("cumin", 4), ("salt", 2), ("olive_oil", 10), ("stock", 200)],
    S("Dice the onion and slice the garlic. Warm the oil in a pot and cook the onion for 5 minutes.",
      "Add the turkey and cook, stirring, until no pink remains.",
      "Stir in the garlic, chili powder and cumin for 30 seconds. Add the tomatoes, drained beans, stock and salt. Simmer 20 minutes.",
      "The chili should look thick and the turkey fully cooked. Rest 5 minutes before serving."))

add("shrimp-garlic", "Garlic shrimp and spinach", "Quick shrimp with garlic, lemon and spinach.", "Mediterranean", 20, ["Stove"], ["gluten-free", "dairy-free"],
    [("shrimp", 300), ("garlic", 3), ("spinach", 100), ("lemon", 1), ("olive_oil", 15), ("salt", 2), ("pepper", 1), ("rice", 150)],
    S("Cook the rice by the package method. Pat the shrimp dry.",
      "Warm the oil over medium heat. Cook the sliced garlic for 30 seconds.",
      "Add the shrimp in a single layer. Cook 2–3 minutes, turning once, until they are pink and opaque. Do not serve them translucent.",
      "Stir in the spinach until wilted. Season with salt, pepper and lemon. Serve beside the rice."))

add("black-bean-soup", "Black bean soup", "Blended and whole beans with cumin, lime and onion.", "Mexican", 30, ["Stove"], ["vegan", "vegetarian", "gluten-free", "dairy-free"],
    [("black_beans", 480), ("onion", 1), ("garlic", 2), ("cumin", 4), ("stock", 400), ("lime", 1), ("olive_oil", 10), ("salt", 2), ("chili_powder", 2)],
    S("Dice the onion and slice the garlic. Warm the oil and cook the onion for 6 minutes. Add the garlic, cumin and chili powder for 30 seconds.",
      "Add the drained beans, stock and salt. Simmer 15 minutes.",
      "Mash or blend half the soup, then stir it back in so the texture is creamy with some whole beans.",
      "Finish with lime juice. Add water if it is thicker than you like."))

add("egg-fried-rice", "Egg fried rice", "Day-style rice scrambled with egg, peas and spring onion.", "Asian", 20, ["Stove"], ["vegetarian", "dairy-free"],
    [("rice", 200), ("eggs", 2), ("peas", 80), ("spring_onion", 20), ("soy_sauce", 15), ("olive_oil", 15), ("salt", 1)],
    S("Cook the rice and spread it to cool slightly, or use cold cooked rice. Beat the eggs. Slice the spring onions.",
      "Warm half the oil and scramble the eggs until just set. Remove them.",
      "Add the remaining oil, rice and peas. Stir-fry 3–4 minutes until the rice is hot. Add the soy sauce.",
      "Return the eggs and spring onions. Toss and serve immediately. Reheated rice must be steaming hot."))

add("berry-yogurt", "Berry yogurt bowl", "Plain yogurt, berries, oats and a spoon of honey.", "Breakfast", 10, ["Stove"], ["vegetarian", "gluten-free"],
    [("yogurt", 250), ("berries", 100), ("oats", 30), ("honey", 15), ("almonds", 15)],
    S("Spoon the yogurt into bowls.",
      "Rinse the berries and scatter them on top.",
      "Add the oats and chopped almonds.",
      "Drizzle the honey. Eat cold. If you avoid gluten, use the certified gluten-free oat adaptation rather than ordinary oats."))

add("peanut-noodles", "Peanut noodles with cabbage", "Warm pasta tossed with peanut butter, lime and cabbage.", "Asian", 25, ["Stove"], ["vegan", "vegetarian", "dairy-free"],
    [("pasta", 180), ("peanut_butter", 40), ("lime", 1), ("soy_sauce", 15), ("cabbage", 120), ("garlic", 1), ("olive_oil", 5)],
    S("Cook the pasta by the package method. Shred the cabbage.",
      "Stir the peanut butter with lime juice, soy sauce and a splash of hot pasta water until smooth.",
      "Toss the drained pasta and cabbage with the sauce and garlic that you have warmed in the oil for 30 seconds.",
      "Serve warm. Add pasta water if the sauce seizes. Peanut is an allergen; this recipe is not suitable for a peanut allergy."))

add("roasted-cauliflower", "Roasted cauliflower and chickpeas", "A tray of browned cauliflower and chickpeas.", "Mediterranean", 35, ["Oven"], ["vegan", "vegetarian", "gluten-free", "dairy-free"],
    [("cauliflower", 500), ("chickpeas", 240), ("olive_oil", 20), ("cumin", 4), ("paprika", 3), ("salt", 2), ("lemon", 1), ("parsley", 8)],
    S("Heat the oven to 425°F / 220°C. Cut the cauliflower into small florets and drain the chickpeas.",
      "Toss both with oil, cumin, paprika and salt on a tray.",
      "Roast 25–30 minutes, turning once, until the cauliflower is tender and browned at the edges.",
      "Finish with lemon and parsley. Serve hot."))

add("sweet-potato-beans", "Sweet potato and black beans", "Roasted sweet potato with cumin beans and lime.", "Mexican", 40, ["Oven", "Stove"], ["vegan", "vegetarian", "gluten-free", "dairy-free"],
    [("sweet_potato", 400), ("black_beans", 240), ("cumin", 3), ("lime", 1), ("olive_oil", 15), ("salt", 2), ("onion", 0.5), ("chili_powder", 2)],
    S("Heat the oven to 425°F / 220°C. Peel and cube the sweet potato. Toss with half the oil and half the salt. Roast 25 minutes until tender.",
      "Dice the onion. Warm the remaining oil and cook the onion for 5 minutes.",
      "Add the drained beans, cumin, chili powder and remaining salt. Warm through for 4 minutes.",
      "Serve the beans beside the sweet potato and finish with lime."))

add("mushroom-rice", "Mushroom garlic rice", "Rice simmered with mushrooms and thyme-like oregano.", "Comfort food", 30, ["Stove"], ["vegan", "vegetarian", "gluten-free", "dairy-free"],
    [("rice", 150), ("mushrooms", 180), ("garlic", 2), ("onion", 0.5), ("stock", 400), ("olive_oil", 15), ("oregano", 1), ("salt", 2), ("parsley", 6)],
    S("Slice the mushrooms and onion. Slice the garlic.",
      "Warm the oil and cook the mushrooms and onion for 6 minutes until the mushrooms have given up their liquid and started to brown.",
      "Add the garlic, oregano, rice, stock and salt. Cover and simmer until the rice is tender.",
      "Rest 5 minutes, fluff and add parsley."))

add("tomato-mozzarella", "Tomato and mozzarella plate", "Sliced tomatoes, mozzarella, basil and oil. No cooking.", "Italian", 15, ["Stove"], ["vegetarian", "gluten-free"],
    [("fresh_tomato", 300), ("mozzarella", 150), ("basil", 8), ("olive_oil", 15), ("salt", 1), ("pepper", 1), ("bread", 80)],
    S("Slice the tomatoes and mozzarella. Tear the basil.",
      "Arrange them on a plate. Season with salt and pepper and drizzle the oil.",
      "Toast or warm the bread if you want something to scoop with.",
      "Serve immediately. Keep cheese refrigerated until you plate it."))

add("chopped-salad", "Chopped lettuce salad", "Lettuce, cucumber, tomato, onion and a lemon dressing.", "Salad", 15, ["Stove"], ["vegan", "vegetarian", "gluten-free", "dairy-free"],
    [("lettuce", 150), ("cucumber", 1), ("fresh_tomato", 150), ("red_onion", 0.25), ("lemon", 1), ("olive_oil", 15), ("salt", 1), ("pepper", 1)],
    S("Wash and dry the lettuce. Chop the cucumber, tomato and onion.",
      "Toss the vegetables in a bowl.",
      "Dress with lemon juice, olive oil, salt and pepper.",
      "Serve right away so the lettuce stays crisp."))

add("chicken-peppers", "Skillet chicken and peppers", "Sliced chicken thigh with peppers and onion.", "Comfort food", 30, ["Stove"], ["gluten-free", "dairy-free"],
    [("chicken", 350), ("bell_pepper", 2), ("onion", 1), ("garlic", 2), ("paprika", 4), ("olive_oil", 15), ("salt", 2), ("pepper", 1)],
    S("Slice the chicken, peppers and onion. Pat the chicken dry.",
      "Warm the oil over medium-high heat. Brown the chicken for 5–6 minutes.",
      "Add the peppers, onion, garlic, paprika, salt and pepper. Cook 8–10 minutes, stirring, until the chicken reaches 165°F / 74°C and the peppers are tender.",
      "Rest 3 minutes. Slice a piece to confirm it is cooked through."))

add("yogurt-cucumber", "Cucumber yogurt", "Cold cucumber in yogurt with garlic and salt.", "Mediterranean", 15, ["Stove"], ["vegetarian", "gluten-free"],
    [("cucumber", 1), ("yogurt", 200), ("garlic", 1), ("salt", 1), ("olive_oil", 5), ("parsley", 5)],
    S("Grate or finely chop the cucumber and squeeze out some water.",
      "Stir it into the yogurt with grated garlic, salt and oil.",
      "Chop the parsley and fold it in.",
      "Chill 10 minutes if you can. Serve cold beside a hotter dish or with bread."))

add("banana-oats", "Banana cinnamon oats", "Oats simmered in milk with banana and cinnamon.", "Breakfast", 15, ["Stove"], ["vegetarian"],
    [("oats", 80), ("milk", 300), ("banana", 1), ("cinnamon", 1), ("salt", 1), ("maple", 15)],
    S("Stir the oats, milk, cinnamon and a pinch of salt in a saucepan.",
      "Simmer 5–7 minutes, stirring, until creamy. Add a splash of water if it is too thick.",
      "Slice the banana.",
      "Spoon the oats into bowls, add the banana and maple. Ordinary oats are not certified gluten-free."))

add("veg-fried-rice", "Vegetable fried rice", "Rice with mixed vegetables, garlic and soy.", "Asian", 20, ["Stove"], ["vegan", "vegetarian", "dairy-free"],
    [("rice", 200), ("mixed_veg", 200), ("garlic", 2), ("soy_sauce", 15), ("olive_oil", 15), ("spring_onion", 15)],
    S("Cook the rice, or start with cold cooked rice. Slice the garlic and spring onion.",
      "Warm the oil and stir-fry the garlic for 20 seconds.",
      "Add the vegetables and cook 4 minutes until hot. Add the rice and soy sauce and stir-fry until the rice is steaming.",
      "Finish with spring onion. Leftover rice must be reheated until hot throughout."))

add("lentil-curry", "Red-pan lentil curry", "Brown lentils in tomato and coconut milk with curry powder.", "Indian", 35, ["Stove"], ["vegan", "vegetarian", "gluten-free", "dairy-free"],
    [("lentils", 180), ("tomatoes", 200), ("coconut_milk", 200), ("curry_powder", 8), ("onion", 1), ("garlic", 2), ("olive_oil", 10), ("salt", 2), ("rice", 120)],
    S("Rinse the lentils. Dice the onion and slice the garlic. Start the rice by its package method.",
      "Warm the oil, cook the onion 5 minutes, then the garlic and curry powder for 30 seconds.",
      "Add the lentils, tomatoes, coconut milk, salt and 200 ml water. Simmer 20–25 minutes until the lentils are tender.",
      "Serve beside the rice. Add water during cooking if the pan looks dry."))

add("eggplant-tomato", "Eggplant and tomato skillet", "Cubed eggplant simmered with garlic and canned tomato.", "Mediterranean", 35, ["Stove"], ["vegan", "vegetarian", "gluten-free", "dairy-free"],
    [("eggplant", 1), ("tomatoes", 300), ("garlic", 2), ("onion", 0.5), ("olive_oil", 20), ("oregano", 1), ("salt", 2), ("basil", 5)],
    S("Cube the eggplant. Dice the onion and slice the garlic.",
      "Warm the oil and cook the eggplant and onion for 8 minutes, stirring, until the eggplant softens.",
      "Add the garlic, oregano, tomatoes and salt. Simmer 15 minutes until the eggplant is tender and the sauce has thickened.",
      "Tear in the basil and serve warm."))

add("kale-beans", "Kale and white bean stew", "Torn kale in a tomato-bean pot.", "Italian", 30, ["Stove"], ["vegan", "vegetarian", "gluten-free", "dairy-free"],
    [("kale", 120), ("white_beans", 360), ("tomatoes", 300), ("garlic", 2), ("olive_oil", 15), ("stock", 200), ("salt", 2), ("pepper", 1)],
    S("Strip the kale from thick stems and chop it. Slice the garlic. Drain the beans.",
      "Warm the oil and cook the garlic 30 seconds.",
      "Add the tomatoes, stock, beans, salt and pepper. Simmer 10 minutes.",
      "Stir in the kale and cook 5 minutes until tender. Serve in bowls."))

add("quinoa-bowl", "Quinoa vegetable bowl", "Quinoa with roasted-style peppers, cucumber and lemon.", "Salad", 25, ["Stove"], ["vegan", "vegetarian", "gluten-free", "dairy-free"],
    [("quinoa", 140), ("bell_pepper", 1), ("cucumber", 0.5), ("lemon", 1), ("olive_oil", 15), ("salt", 2), ("parsley", 8)],
    S("Rinse the quinoa. Simmer it in water by the package method, then drain any extra water and fluff.",
      "Dice the pepper and cucumber. Chop the parsley.",
      "Toss the quinoa with the vegetables, oil, lemon juice and salt.",
      "Serve warm or cool. Quinoa should taste tender, not gritty."))

add("breakfast-tacos", "Egg and salsa tacos", "Soft tortillas, scrambled eggs, salsa and a little cheddar.", "Mexican", 20, ["Stove"], ["vegetarian"],
    [("eggs", 3), ("tortillas", 4), ("salsa", 80), ("cheddar", 40), ("olive_oil", 8), ("salt", 1)],
    S("Beat the eggs with salt. Grate the cheddar.",
      "Scramble the eggs in the oil over medium-low heat until just set.",
      "Warm the tortillas in a dry pan for a few seconds each side.",
      "Fill with eggs, salsa and cheddar. Serve immediately."))

add("salmon-rice-bowl", "Salmon rice bowl", "Flaked roasted salmon, rice, cucumber and sesame oil.", "Asian", 30, ["Oven", "Stove"], ["gluten-free", "dairy-free"],
    [("salmon", 280), ("rice", 150), ("cucumber", 0.5), ("sesame_oil", 8), ("soy_sauce", 10), ("salt", 1), ("spring_onion", 15)],
    S("Heat the oven to 400°F / 200°C. Season the salmon with salt and roast 12–14 minutes until it flakes and is opaque.",
      "Cook the rice by the package method. Slice the cucumber and spring onion.",
      "Flake the salmon, discarding skin if you prefer.",
      "Build bowls of rice, cucumber and salmon. Drizzle sesame oil and soy sauce."))

add("tofu-curry", "Tofu coconut curry", "Tofu cubes in a tomato-coconut curry with spinach.", "Indian", 30, ["Stove"], ["vegan", "vegetarian", "gluten-free", "dairy-free"],
    [("tofu", 300), ("tomatoes", 200), ("coconut_milk", 200), ("curry_powder", 8), ("spinach", 80), ("garlic", 2), ("olive_oil", 10), ("salt", 2), ("rice", 120)],
    S("Cube the tofu and pat it dry. Start the rice. Slice the garlic.",
      "Brown the tofu in the oil and set it aside. Cook the garlic and curry powder for 30 seconds.",
      "Add the tomatoes, coconut milk and salt. Simmer 8 minutes. Return the tofu and add the spinach.",
      "Cook 3 minutes until the spinach wilts and the tofu is hot. Serve with the rice."))

add("beef-broccoli", "Beef and broccoli", "Ground beef and broccoli in a soy-garlic pan.", "Asian", 25, ["Stove"], ["dairy-free"],
    [("ground_beef", 300), ("broccoli", 250), ("garlic", 2), ("soy_sauce", 20), ("ginger", 8), ("olive_oil", 10), ("rice", 150)],
    S("Cook the rice. Cut the broccoli small. Slice the garlic and ginger.",
      "Cook the beef in the oil until no pink remains. Add the garlic and ginger for 30 seconds.",
      "Add the broccoli and a splash of water. Cover 4 minutes.",
      "Uncover, add the soy sauce and cook until the broccoli is tender and the beef is hot. Serve over rice."))

add("turkey-pasta", "Turkey tomato pasta", "Ground turkey simmered with tomato and tossed with pasta.", "Italian", 30, ["Stove"], ["dairy-free"],
    [("turkey", 300), ("pasta", 180), ("tomatoes", 300), ("garlic", 2), ("onion", 0.5), ("olive_oil", 10), ("oregano", 1), ("salt", 2)],
    S("Cook the pasta by the package method and reserve a cup of water. Dice the onion and slice the garlic.",
      "Cook the onion in the oil for 4 minutes. Add the turkey and cook until no pink remains.",
      "Add the garlic, oregano, tomatoes and salt. Simmer 10 minutes.",
      "Toss with the pasta and a splash of pasta water. Serve hot."))

add("vegetable-soup", "Vegetable soup", "Carrot, celery, potato, tomato and peas in stock.", "Comfort food", 35, ["Stove"], ["vegan", "vegetarian", "gluten-free", "dairy-free"],
    [("carrots", 150), ("celery", 80), ("potatoes", 200), ("tomatoes", 200), ("peas", 80), ("onion", 1), ("stock", 800), ("olive_oil", 10), ("salt", 3), ("parsley", 6)],
    S("Dice the onion, carrot, celery and potato.",
      "Warm the oil and cook the onion, carrot and celery for 5 minutes.",
      "Add the potato, tomatoes, stock and salt. Simmer 15 minutes until the potato is tender.",
      "Stir in the peas and parsley and cook 3 minutes. Serve hot."))

add("bean-corn-skillet", "Bean and corn skillet", "Black beans, sweetcorn, pepper and cumin.", "Mexican", 20, ["Stove"], ["vegan", "vegetarian", "gluten-free", "dairy-free"],
    [("black_beans", 240), ("corn", 150), ("bell_pepper", 1), ("cumin", 3), ("lime", 1), ("olive_oil", 10), ("salt", 1), ("garlic", 1)],
    S("Dice the pepper. Drain the beans and corn if needed.",
      "Warm the oil and cook the pepper and garlic for 4 minutes.",
      "Add the beans, corn, cumin and salt. Cook 5 minutes until hot.",
      "Finish with lime and serve."))

add("feta-eggs", "Spinach and feta eggs", "Eggs scrambled with spinach and crumbled feta.", "Mediterranean", 15, ["Stove"], ["vegetarian", "gluten-free"],
    [("eggs", 3), ("spinach", 50), ("feta", 40), ("olive_oil", 8), ("pepper", 1)],
    S("Beat the eggs. Crumble the feta.",
      "Wilt the spinach in the oil for 1 minute.",
      "Pour in the eggs and stir gently over medium-low heat until just set.",
      "Fold in the feta and pepper. Serve immediately."))

add("mustard-chicken", "Mustard chicken and potatoes", "Chicken thighs and potatoes with Dijon and garlic.", "Comfort food", 45, ["Oven"], ["gluten-free", "dairy-free"],
    [("chicken", 400), ("potatoes", 400), ("mustard", 20), ("garlic", 2), ("olive_oil", 15), ("salt", 2), ("pepper", 1)],
    S("Heat the oven to 425°F / 220°C. Cut the potatoes into chunks. Stir the mustard, chopped garlic, oil, salt and pepper together.",
      "Toss the potatoes and chicken with the mustard mixture on a tray, keeping the chicken on top.",
      "Roast 30–35 minutes, until the chicken reaches 165°F / 74°C and the potatoes are tender.",
      "Rest the chicken 5 minutes before serving."))

add("chickpea-broccoli", "Roasted broccoli and chickpeas", "A hot tray of broccoli and chickpeas with lemon.", "Mediterranean", 30, ["Oven"], ["vegan", "vegetarian", "gluten-free", "dairy-free"],
    [("broccoli", 350), ("chickpeas", 240), ("olive_oil", 15), ("lemon", 1), ("salt", 2), ("pepper", 1), ("garlic", 1)],
    S("Heat the oven to 425°F / 220°C. Cut the broccoli into florets and drain the chickpeas.",
      "Toss with oil, salt, pepper and chopped garlic.",
      "Roast 20–25 minutes until the broccoli is browned and tender.",
      "Squeeze the lemon over the tray and serve."))

add("potato-onion", "Potato and onion skillet", "Sliced potatoes cooked with onion until tender.", "Comfort food", 30, ["Stove"], ["vegan", "vegetarian", "gluten-free", "dairy-free"],
    [("potatoes", 400), ("onion", 1), ("olive_oil", 20), ("salt", 2), ("paprika", 2), ("parsley", 5)],
    S("Slice the potatoes and onion thinly.",
      "Warm the oil in a wide pan. Cook the onion for 4 minutes.",
      "Add the potatoes, salt and paprika. Cover and cook on medium-low for 15 minutes, turning now and then, until the potatoes are tender. Uncover to brown for 3 minutes.",
      "Finish with parsley. Check a thick slice is soft in the center."))

add("tomato-rice", "Tomato rice", "Rice cooked in tomato, onion and stock.", "Comfort food", 30, ["Stove"], ["vegan", "vegetarian", "gluten-free", "dairy-free"],
    [("rice", 160), ("tomatoes", 200), ("onion", 0.5), ("stock", 350), ("olive_oil", 10), ("salt", 2), ("garlic", 1)],
    S("Dice the onion and slice the garlic. Rinse the rice.",
      "Cook the onion in the oil for 4 minutes. Add the garlic for 20 seconds.",
      "Stir in the rice, tomatoes, stock and salt. Cover and simmer until the rice is tender, about 15–18 minutes.",
      "Rest 5 minutes and fluff."))

add("apple-oats", "Apple cinnamon oats", "Oats with diced apple and cinnamon.", "Breakfast", 15, ["Stove"], ["vegetarian"],
    [("oats", 80), ("apple", 120), ("milk", 250), ("cinnamon", 1), ("maple", 10), ("salt", 1)],
    S("Dice the apple, leaving the skin on if you like.",
      "Simmer the oats, milk, apple, cinnamon and a pinch of salt for 6–8 minutes.",
      "Stir so the bottom does not catch. Add water if needed.",
      "Serve with maple. The apple should be soft."))

add("tuna-pasta", "Tuna tomato pasta", "Pasta with tuna, tomato and parsley.", "Italian", 25, ["Stove"], ["dairy-free"],
    [("pasta", 180), ("tuna", 142), ("tomatoes", 200), ("garlic", 1), ("olive_oil", 10), ("parsley", 8), ("salt", 1), ("pepper", 1)],
    S("Cook the pasta and reserve some water. Drain the tuna.",
      "Warm the oil and cook the sliced garlic for 20 seconds. Add the tomatoes, salt and pepper and simmer 8 minutes.",
      "Stir in the tuna and heat 2 minutes. Do not boil it hard or it dries out.",
      "Toss with the pasta, parsley and a splash of pasta water."))

add("bean-burritos", "Bean and rice burritos", "Tortillas rolled around rice, black beans and salsa.", "Mexican", 25, ["Stove"], ["vegan", "vegetarian", "dairy-free"],
    [("tortillas", 4), ("rice", 150), ("black_beans", 240), ("salsa", 80), ("cumin", 2), ("salt", 1), ("olive_oil", 5)],
    S("Cook the rice. Warm the beans with cumin, salt and oil.",
      "Warm the tortillas in a dry pan.",
      "Fill each with rice, beans and salsa. Fold the sides and roll.",
      "Serve immediately. The filling should be hot and the tortillas soft."))

add("zucchini-skillet", "Zucchini, tomato and garlic", "Soft zucchini in a quick tomato pan.", "Mediterranean", 25, ["Stove"], ["vegan", "vegetarian", "gluten-free", "dairy-free"],
    [("zucchini", 2), ("tomatoes", 250), ("garlic", 2), ("olive_oil", 15), ("oregano", 1), ("salt", 2), ("basil", 4)],
    S("Halve the zucchini lengthwise and slice into half-moons. Slice the garlic.",
      "Warm the oil and cook the zucchini for 6 minutes until it starts to brown.",
      "Add the garlic, oregano, tomatoes and salt. Simmer 10 minutes until the zucchini is tender.",
      "Tear in the basil and serve."))

add("mushroom-pasta", "Garlic mushroom pasta", "Pasta with browned mushrooms and parsley.", "Italian", 25, ["Stove"], ["vegan", "vegetarian", "dairy-free"],
    [("pasta", 180), ("mushrooms", 200), ("garlic", 2), ("olive_oil", 15), ("parsley", 8), ("salt", 2), ("pepper", 1)],
    S("Cook the pasta and reserve water. Slice the mushrooms and garlic.",
      "Cook the mushrooms in the oil over medium-high heat until browned, about 6 minutes. Add the garlic, salt and pepper for 30 seconds.",
      "Toss with the drained pasta and a splash of pasta water.",
      "Finish with parsley."))

add("baked-eggs", "Baked eggs in tomato", "Eggs set in a skillet of simmered tomato.", "Comfort food", 25, ["Stove"], ["vegetarian", "gluten-free"],
    [("eggs", 2), ("tomatoes", 300), ("garlic", 1), ("onion", 0.5), ("olive_oil", 10), ("salt", 1), ("paprika", 2)],
    S("Dice the onion and slice the garlic. Cook them in the oil for 4 minutes.",
      "Add the tomatoes, salt and paprika. Simmer 8 minutes until slightly thick.",
      "Make two wells and crack in the eggs. Cover and cook on low until the whites are set and the yolks are as firm as you want, usually 4–6 minutes.",
      "Serve at once. Do not serve eggs with unset whites."))

add("carrot-ginger-soup", "Carrot ginger soup", "Carrots blended with ginger, onion and stock.", "Comfort food", 35, ["Stove"], ["vegan", "vegetarian", "gluten-free", "dairy-free"],
    [("carrots", 400), ("ginger", 12), ("onion", 1), ("stock", 600), ("olive_oil", 10), ("salt", 2)],
    S("Slice the carrots and onion. Grate the ginger.",
      "Cook the onion in the oil for 5 minutes. Add the ginger and carrots and stir for 1 minute.",
      "Add the stock and salt. Simmer 20 minutes until the carrots are very soft.",
      "Blend until smooth, adding water if needed. Reheat if the blender cooled it. Serve hot."))

add("peanut-tofu", "Peanut tofu", "Tofu in a peanut, lime and soy sauce with rice.", "Asian", 25, ["Stove"], ["vegan", "vegetarian", "dairy-free"],
    [("tofu", 300), ("peanut_butter", 35), ("lime", 1), ("soy_sauce", 15), ("garlic", 1), ("rice", 150), ("olive_oil", 10)],
    S("Cook the rice. Cube and pat the tofu dry.",
      "Brown the tofu in the oil. Stir the peanut butter, lime juice, soy sauce, chopped garlic and 3 tablespoons of water into a sauce.",
      "Pour the sauce over the tofu and simmer 3 minutes until it coats the cubes and is hot.",
      "Serve over rice. This contains peanut."))

add("salmon-kale", "Salmon and kale", "Pan salmon with garlicky kale.", "Comfort food", 25, ["Stove"], ["gluten-free", "dairy-free"],
    [("salmon", 300), ("kale", 120), ("garlic", 2), ("olive_oil", 15), ("lemon", 1), ("salt", 2), ("pepper", 1)],
    S("Pat the salmon dry and season it. Strip and chop the kale.",
      "Cook the salmon in half the oil, 3–4 minutes per side, until it flakes and the center is opaque.",
      "In the same pan, cook the garlic for 20 seconds, then the kale with a splash of water and the remaining salt until tender, about 4 minutes.",
      "Serve the salmon on the kale with lemon."))

add("beef-chili", "Beef and tomato chili", "Ground beef chili with kidney beans.", "Comfort food", 40, ["Stove"], ["gluten-free", "dairy-free"],
    [("ground_beef", 350), ("kidney_beans", 240), ("tomatoes", 400), ("onion", 1), ("chili_powder", 8), ("cumin", 3), ("salt", 2), ("olive_oil", 8), ("garlic", 2)],
    S("Dice the onion. Cook it in the oil for 4 minutes.",
      "Add the beef and cook until no pink remains.",
      "Add the garlic, chili powder, cumin, tomatoes, drained beans and salt. Simmer 20 minutes.",
      "Stir occasionally and add a splash of water if it sticks. Rest 5 minutes."))

add("cauliflower-curry", "Cauliflower coconut curry", "Cauliflower and peas in coconut curry.", "Indian", 30, ["Stove"], ["vegan", "vegetarian", "gluten-free", "dairy-free"],
    [("cauliflower", 450), ("peas", 80), ("coconut_milk", 200), ("curry_powder", 8), ("onion", 1), ("garlic", 2), ("olive_oil", 10), ("salt", 2), ("rice", 120)],
    S("Cut the cauliflower into florets. Dice the onion and slice the garlic. Start the rice.",
      "Cook the onion in the oil for 5 minutes. Add the garlic and curry powder for 30 seconds.",
      "Add the cauliflower, coconut milk, salt and a splash of water. Cover and simmer 12 minutes.",
      "Stir in the peas and cook 3 minutes until the cauliflower is tender. Serve with rice."))

add("sweet-potato-soup", "Sweet potato soup", "A smooth pot of sweet potato, onion and stock.", "Comfort food", 35, ["Stove"], ["vegan", "vegetarian", "gluten-free", "dairy-free"],
    [("sweet_potato", 450), ("onion", 1), ("stock", 600), ("olive_oil", 10), ("salt", 2), ("ginger", 6)],
    S("Peel and cube the sweet potato. Dice the onion. Grate the ginger.",
      "Cook the onion in the oil for 5 minutes. Add the ginger and sweet potato.",
      "Add the stock and salt. Simmer 18 minutes until very soft.",
      "Blend smooth and serve hot."))

add("egg-drop-greens", "Egg and spinach soup", "Stock, beaten egg and spinach. A light bowl.", "Asian", 15, ["Stove"], ["vegetarian", "gluten-free", "dairy-free"],
    [("stock", 700), ("eggs", 2), ("spinach", 60), ("soy_sauce", 10), ("spring_onion", 15), ("pepper", 1)],
    S("Bring the stock and soy sauce to a simmer. Slice the spring onion.",
      "Beat the eggs.",
      "Stir the soup and slowly stream in the eggs so they set in ribbons. Cook 1 minute.",
      "Add the spinach until wilted. Finish with spring onion and pepper. The egg should be fully set."))

add("mozzarella-pasta", "Tomato mozzarella pasta", "Pasta, tomato sauce and mozzarella melted at the end.", "Italian", 25, ["Stove"], ["vegetarian"],
    [("pasta", 180), ("tomatoes", 300), ("mozzarella", 80), ("garlic", 1), ("basil", 6), ("olive_oil", 10), ("salt", 2)],
    S("Cook the pasta. Slice the garlic and tear the mozzarella and basil.",
      "Simmer the garlic, oil, tomatoes and salt for 10 minutes.",
      "Toss in the pasta. Take the pan off the heat and fold in the mozzarella so it softens.",
      "Add the basil and serve immediately."))

add("lentil-spinach", "Lentil and spinach stew", "Lentils finished with a handful of spinach.", "Comfort food", 35, ["Stove"], ["vegan", "vegetarian", "gluten-free", "dairy-free"],
    [("lentils", 180), ("spinach", 80), ("onion", 1), ("carrots", 100), ("stock", 600), ("cumin", 3), ("olive_oil", 10), ("salt", 2), ("garlic", 1)],
    S("Rinse the lentils. Dice the onion and carrot. Slice the garlic.",
      "Cook the onion and carrot in the oil for 5 minutes. Add the garlic and cumin for 30 seconds.",
      "Add the lentils, stock and salt. Simmer 22 minutes until tender.",
      "Stir in the spinach until wilted and serve."))

add("shrimp-tacos", "Shrimp tacos", "Spiced shrimp in tortillas with cabbage and lime.", "Mexican", 25, ["Stove"], ["dairy-free"],
    [("shrimp", 280), ("tortillas", 4), ("cabbage", 100), ("lime", 1), ("chili_powder", 3), ("olive_oil", 10), ("salt", 1)],
    S("Toss the shrimp with chili powder and salt. Shred the cabbage and dress it with half the lime.",
      "Cook the shrimp in the oil 2–3 minutes until pink and opaque.",
      "Warm the tortillas.",
      "Fill with cabbage and shrimp and finish with the remaining lime."))

add("chicken-soup", "Chicken and rice soup", "Chicken, rice, carrot and celery in a pot.", "Comfort food", 40, ["Stove"], ["gluten-free", "dairy-free"],
    [("chicken", 300), ("rice", 80), ("carrots", 100), ("celery", 60), ("onion", 0.5), ("stock", 800), ("salt", 2), ("parsley", 6)],
    S("Dice the onion, carrot and celery. Cut the chicken into bite-size pieces.",
      "Simmer the vegetables in the stock for 8 minutes.",
      "Add the chicken, rice and salt. Simmer 15–18 minutes until the chicken reaches 165°F / 74°C and the rice is tender.",
      "Stir in the parsley. Add water if the rice has drunk the broth."))

add("roasted-veg-quinoa", "Roasted vegetables and quinoa", "Pepper, zucchini and onion roasted beside a pot of quinoa.", "Mediterranean", 40, ["Oven", "Stove"], ["vegan", "vegetarian", "gluten-free", "dairy-free"],
    [("bell_pepper", 1), ("zucchini", 1), ("onion", 1), ("quinoa", 140), ("olive_oil", 15), ("salt", 2), ("lemon", 1)],
    S("Heat the oven to 425°F / 220°C. Cut the pepper, zucchini and onion into pieces. Toss with oil and salt. Roast 25 minutes.",
      "Meanwhile rinse and simmer the quinoa until tender. Fluff it.",
      "Toss the roasted vegetables with the quinoa.",
      "Finish with lemon."))

add("cabbage-stir", "Cabbage and carrot stir-fry", "Shredded cabbage and carrot with garlic and soy.", "Asian", 15, ["Stove"], ["vegan", "vegetarian", "dairy-free"],
    [("cabbage", 300), ("carrots", 100), ("garlic", 2), ("soy_sauce", 15), ("olive_oil", 10), ("sesame_oil", 5)],
    S("Shred the cabbage and grate the carrot. Slice the garlic.",
      "Warm the olive oil and cook the garlic for 20 seconds.",
      "Add the cabbage and carrot. Stir-fry 5–6 minutes until tender-crisp.",
      "Add the soy sauce and sesame oil. Serve hot."))

add("potato-egg-hash", "Potato and egg hash", "Crisped potato and onion with eggs on top.", "Breakfast", 30, ["Stove"], ["vegetarian", "gluten-free"],
    [("potatoes", 350), ("onion", 0.5), ("eggs", 2), ("olive_oil", 15), ("salt", 2), ("paprika", 2), ("parsley", 4)],
    S("Dice the potatoes and onion small.",
      "Cook them in the oil with salt and paprika, covered, for 12 minutes. Uncover and brown for 4 minutes. The potato must be soft inside.",
      "Make two spaces and crack in the eggs. Cover until the whites set.",
      "Finish with parsley."))

add("berry-parfait", "Berry yogurt parfait", "Layers of yogurt, berries and oats.", "Breakfast", 10, ["Stove"], ["vegetarian"],
    [("yogurt", 250), ("frozen_berries", 100), ("oats", 30), ("honey", 10)],
    S("Let the berries sit 5 minutes if they are frozen solid, or thaw them in the refrigerator.",
      "Spoon yogurt into glasses.",
      "Add berries and oats in layers.",
      "Drizzle honey. Eat cold."))

add("pepper-onion", "Pepper and onion tacos", "Soft peppers and onion in tortillas with salsa.", "Mexican", 20, ["Stove"], ["vegan", "vegetarian", "dairy-free"],
    [("bell_pepper", 2), ("onion", 1), ("tortillas", 4), ("salsa", 60), ("olive_oil", 10), ("salt", 1), ("cumin", 2)],
    S("Slice the peppers and onion.",
      "Cook them in the oil with salt and cumin for 10 minutes until soft.",
      "Warm the tortillas.",
      "Fill with the vegetables and salsa."))

add("tuna-rice", "Tuna rice cakes", "Pan-crisped patties of rice, tuna and parsley.", "Comfort food", 25, ["Stove"], ["dairy-free"],
    [("rice", 200), ("tuna", 142), ("parsley", 8), ("egg", 0), ("eggs", 1), ("breadcrumbs", 30), ("olive_oil", 15), ("salt", 1), ("lemon", 1)],
    S("Cook and cool the rice slightly. Drain the tuna and chop the parsley.",
      "Mix the rice, tuna, parsley, egg, breadcrumbs, salt and half the lemon juice. Shape four patties.",
      "Fry in the oil over medium heat, 3–4 minutes per side, until browned and hot in the center.",
      "Serve with the remaining lemon. The egg in the patty should be fully cooked."))

add("baked-oatmeal", "Baked cinnamon oatmeal", "Oats baked with milk, banana and cinnamon.", "Breakfast", 40, ["Oven"], ["vegetarian"],
    [("oats", 120), ("milk", 300), ("banana", 1), ("cinnamon", 2), ("maple", 20), ("salt", 1)],
    S("Heat the oven to 375°F / 190°C. Mash the banana.",
      "Stir the oats, milk, banana, cinnamon, maple and salt in a small baking dish.",
      "Bake 25–30 minutes until the center is set and the top is golden.",
      "Rest 5 minutes. It will be hot. Ordinary oats are not a gluten-free ingredient."))

add("tomato-lentils", "Tomato lentil soup", "Lentils cooked directly in tomato and stock.", "Comfort food", 35, ["Stove"], ["vegan", "vegetarian", "gluten-free", "dairy-free"],
    [("lentils", 180), ("tomatoes", 300), ("stock", 500), ("onion", 1), ("carrot", 0), ("carrots", 80), ("olive_oil", 10), ("salt", 2), ("oregano", 1)],
    S("Rinse the lentils. Dice the onion and carrot.",
      "Cook the onion and carrot in the oil for 5 minutes.",
      "Add the lentils, tomatoes, stock, oregano and salt. Simmer 25 minutes until the lentils are soft.",
      "Add water if you want it soupier. Serve hot."))

add("herb-chicken-potatoes", "Herb chicken and potatoes", "Chicken and potatoes with parsley, garlic and lemon.", "Mediterranean", 45, ["Oven"], ["gluten-free", "dairy-free"],
    [("chicken", 400), ("potatoes", 400), ("parsley", 10), ("garlic", 2), ("lemon", 1), ("olive_oil", 20), ("salt", 3), ("pepper", 1)],
    S("Heat the oven to 425°F / 220°C. Cut the potatoes into chunks. Chop the parsley and garlic.",
      "Toss everything except half the parsley with oil, salt, pepper and half the lemon juice.",
      "Roast 30–35 minutes until the chicken reaches 165°F / 74°C and the potatoes are tender.",
      "Rest 5 minutes. Scatter the remaining parsley and lemon."))

add("tofu-scramble", "Tofu scramble", "Crumbled tofu with curry powder, spinach and onion.", "Breakfast", 20, ["Stove"], ["vegan", "vegetarian", "gluten-free", "dairy-free"],
    [("tofu", 300), ("spinach", 60), ("onion", 0.5), ("curry_powder", 4), ("olive_oil", 12), ("salt", 2), ("garlic", 1)],
    S("Dice the onion and slice the garlic. Crumble the tofu with a fork.",
      "Cook the onion in the oil for 4 minutes. Add the garlic and curry powder for 30 seconds.",
      "Add the tofu and salt. Cook 5 minutes, stirring, until hot.",
      "Fold in the spinach until wilted. Serve warm."))

add("beef-potato", "Beef and potato skillet", "Ground beef and diced potato in one pan.", "Comfort food", 35, ["Stove"], ["gluten-free", "dairy-free"],
    [("ground_beef", 300), ("potatoes", 300), ("onion", 0.5), ("paprika", 3), ("salt", 2), ("olive_oil", 10), ("garlic", 1)],
    S("Dice the potato and onion small.",
      "Cook the beef in a skillet until no pink remains. Move it to a bowl.",
      "Add the oil, potato and onion. Cover and cook 12 minutes until the potato is tender. Stir in the garlic, paprika and salt.",
      "Return the beef and cook 3 minutes until everything is hot."))

add("ginger-salmon", "Ginger salmon", "Salmon baked with ginger, garlic and a little soy.", "Asian", 25, ["Oven"], ["dairy-free"],
    [("salmon", 300), ("ginger", 10), ("garlic", 1), ("soy_sauce", 15), ("olive_oil", 8), ("rice", 150)],
    S("Heat the oven to 400°F / 200°C. Cook the rice.",
      "Place the salmon in a small dish. Mix grated ginger, chopped garlic, soy sauce and oil and spoon it over the fish.",
      "Bake 12–14 minutes until the salmon flakes and is opaque in the center.",
      "Serve with the rice and the juices from the dish."))

add("corn-chowder", "Corn and potato chowder", "A milky pot of corn and potato. Not a canned soup.", "Comfort food", 30, ["Stove"], ["vegetarian", "gluten-free"],
    [("corn", 250), ("potatoes", 250), ("onion", 0.5), ("milk", 400), ("butter", 15), ("salt", 2), ("pepper", 1)],
    S("Dice the onion and potato.",
      "Melt the butter and cook the onion for 4 minutes. Add the potato, corn, salt and pepper.",
      "Pour in the milk and 100 ml water. Simmer gently 15 minutes until the potato is tender. Do not boil the milk hard.",
      "Mash a few potatoes into the pot to thicken it. Serve hot."))

add("kale-apple", "Kale and apple salad", "Raw kale massaged with lemon, apple and walnuts.", "Salad", 15, ["Stove"], ["vegan", "vegetarian", "gluten-free", "dairy-free"],
    [("kale", 100), ("apple", 120), ("walnuts", 25), ("lemon", 1), ("olive_oil", 15), ("salt", 1)],
    S("Strip the kale and slice it thin. Dice the apple and chop the walnuts.",
      "Toss the kale with lemon juice, oil and salt for a minute so it softens.",
      "Add the apple and walnuts.",
      "Serve soon, before the apple browns."))

add("chickpea-tomato", "Chickpea tomato stew", "Chickpeas simmered with tomato, garlic and spinach. No curry powder.", "Mediterranean", 25, ["Stove"], ["vegan", "vegetarian", "gluten-free", "dairy-free"],
    [("chickpeas", 360), ("tomatoes", 300), ("garlic", 2), ("spinach", 60), ("olive_oil", 12), ("salt", 2), ("oregano", 1)],
    S("Drain the chickpeas. Slice the garlic.",
      "Warm the oil and cook the garlic and oregano for 30 seconds.",
      "Add the tomatoes, chickpeas and salt. Simmer 12 minutes.",
      "Stir in the spinach until wilted. Serve in bowls."))

add("shrimp-broccoli", "Shrimp and broccoli", "Shrimp and broccoli with garlic and lemon.", "Comfort food", 20, ["Stove"], ["gluten-free", "dairy-free"],
    [("shrimp", 280), ("broccoli", 250), ("garlic", 2), ("lemon", 1), ("olive_oil", 12), ("salt", 2)],
    S("Cut the broccoli into small florets. Pat the shrimp dry.",
      "Cook the broccoli in half the oil with a splash of water, covered, for 4 minutes. Uncover and add the garlic for 20 seconds.",
      "Push the broccoli aside. Add the remaining oil and the shrimp. Cook 2–3 minutes until pink and opaque.",
      "Toss together, season with salt and lemon, and serve."))

add("eggplant-rice", "Eggplant and rice", "Roasted eggplant cubes stirred through rice.", "Mediterranean", 40, ["Oven", "Stove"], ["vegan", "vegetarian", "gluten-free", "dairy-free"],
    [("eggplant", 1), ("rice", 150), ("tomatoes", 150), ("garlic", 1), ("olive_oil", 15), ("salt", 2), ("basil", 4)],
    S("Heat the oven to 425°F / 220°C. Cube the eggplant, toss with oil and salt, and roast 25 minutes.",
      "Cook the rice. Simmer the tomatoes with sliced garlic for 8 minutes.",
      "Fold the eggplant and tomato into the rice.",
      "Add basil and serve."))

add("breakfast-rice", "Breakfast rice and egg", "Warm rice with a fried egg, sesame oil and spring onion.", "Breakfast", 20, ["Stove"], ["vegetarian", "dairy-free"],
    [("rice", 160), ("eggs", 2), ("sesame_oil", 6), ("spring_onion", 15), ("soy_sauce", 8), ("olive_oil", 8)],
    S("Cook the rice. Slice the spring onion.",
      "Fry the eggs in the olive oil until the whites are set.",
      "Spoon the rice into bowls and add the sesame oil and soy sauce.",
      "Top with the eggs and spring onion."))

add("mustard-salmon", "Mustard salmon and green beans", "Salmon spread with Dijon beside green beans.", "Comfort food", 25, ["Oven", "Stove"], ["gluten-free", "dairy-free"],
    [("salmon", 300), ("green_beans", 250), ("mustard", 15), ("lemon", 1), ("olive_oil", 10), ("salt", 2)],
    S("Heat the oven to 400°F / 200°C. Spread the mustard on the salmon and season with salt. Bake 12–14 minutes until opaque.",
      "Meanwhile cook the green beans in simmering water for 4–5 minutes until tender. Drain.",
      "Toss the beans with oil, salt and lemon.",
      "Serve the salmon beside the beans."))

add("turkey-veg", "Turkey vegetable skillet", "Ground turkey with mixed vegetables and tomato.", "Comfort food", 30, ["Stove"], ["gluten-free", "dairy-free"],
    [("turkey", 320), ("mixed_veg", 200), ("tomatoes", 200), ("onion", 0.5), ("garlic", 1), ("paprika", 3), ("salt", 2), ("olive_oil", 8)],
    S("Dice the onion. Cook it in the oil for 3 minutes.",
      "Add the turkey and cook until no pink remains.",
      "Add the garlic, paprika, vegetables, tomatoes and salt. Cover and cook 8 minutes until the vegetables are hot and tender.",
      "Serve in bowls."))

add("bean-chili", "Three-bean chili", "Black beans, kidney beans and chickpeas in tomato and chili.", "Comfort food", 30, ["Stove"], ["vegan", "vegetarian", "gluten-free", "dairy-free"],
    [("black_beans", 240), ("kidney_beans", 240), ("chickpeas", 120), ("tomatoes", 300), ("onion", 1), ("chili_powder", 8), ("cumin", 3), ("salt", 2), ("olive_oil", 10), ("garlic", 2)],
    S("Dice the onion and slice the garlic. Drain the beans.",
      "Cook the onion in the oil for 5 minutes. Add the garlic, chili powder and cumin for 30 seconds.",
      "Add all the beans, tomatoes and salt. Simmer 15 minutes.",
      "Stir and add a splash of water if it is too thick. Serve hot."))

add("garlic-noodles", "Garlic noodles", "Pasta with olive oil, garlic and black pepper. A plain bowl.", "Italian", 20, ["Stove"], ["vegan", "vegetarian", "dairy-free"],
    [("pasta", 180), ("garlic", 3), ("olive_oil", 25), ("parsley", 8), ("salt", 2), ("pepper", 1)],
    S("Cook the pasta and reserve water. Slice the garlic.",
      "Warm the oil over low heat and cook the garlic for 30–40 seconds until fragrant, not brown.",
      "Toss the drained pasta with the garlic oil, salt, pepper and a splash of pasta water.",
      "Finish with parsley."))

add("stuffed-peppers", "Rice and bean stuffed peppers", "Bell peppers filled with rice and black beans and baked.", "Mexican", 45, ["Oven", "Stove"], ["vegan", "vegetarian", "gluten-free", "dairy-free"],
    [("bell_pepper", 2), ("rice", 120), ("black_beans", 200), ("tomatoes", 100), ("cumin", 2), ("salt", 2), ("olive_oil", 10)],
    S("Cook the rice. Heat the oven to 400°F / 200°C. Cut the tops off the peppers and remove the seeds.",
      "Mix the rice, drained beans, tomatoes, cumin, salt and oil.",
      "Stuff the peppers and set them in a small dish with a splash of water. Cover.",
      "Bake 25 minutes until the peppers are tender. Rest 5 minutes."))

add("banana-toast", "Banana peanut toast", "Toast with peanut butter and banana.", "Breakfast", 10, ["Stove"], ["vegetarian"],
    [("bread", 80), ("peanut_butter", 30), ("banana", 1), ("cinnamon", 1)],
    S("Toast the bread until dry and golden.",
      "Spread the peanut butter.",
      "Slice the banana and lay it on the toast.",
      "Dust with cinnamon. This contains peanut and wheat."))

add("avocado-toast", "Avocado and tomato toast", "Toast with mashed avocado, tomato and salt.", "Breakfast", 10, ["Stove"], ["vegan", "vegetarian", "dairy-free"],
    [("bread", 80), ("avocado", 1), ("fresh_tomato", 80), ("salt", 1), ("lemon", 0.5), ("pepper", 1)],
    S("Toast the bread.",
      "Mash the avocado with lemon juice, salt and pepper.",
      "Slice the tomato.",
      "Spread the avocado and top with tomato. Eat soon so the avocado stays green."))

add("green-bean-almonds", "Green beans with almonds", "Blanched green beans tossed with oil and almonds.", "Side", 15, ["Stove"], ["vegan", "vegetarian", "gluten-free", "dairy-free"],
    [("green_beans", 300), ("almonds", 25), ("olive_oil", 10), ("lemon", 0.5), ("salt", 1), ("garlic", 1)],
    S("Trim the beans. Chop the almonds and slice the garlic.",
      "Simmer the beans in water for 4 minutes until tender-crisp. Drain.",
      "Warm the oil, cook the garlic 20 seconds, add the almonds and beans, and toss 1 minute.",
      "Finish with salt and lemon."))

add("raisin-oats", "Raisin walnut oats", "Oats with raisins and walnuts.", "Breakfast", 15, ["Stove"], ["vegetarian"],
    [("oats", 80), ("milk", 280), ("raisins", 25), ("walnuts", 15), ("cinnamon", 1), ("salt", 1)],
    S("Simmer the oats, milk, raisins, cinnamon and a pinch of salt for 6 minutes.",
      "Stir so they do not stick.",
      "Chop the walnuts.",
      "Serve the oats with the walnuts on top."))

add("salsa-eggs", "Salsa baked eggs", "Eggs baked in salsa. A small pan.", "Mexican", 20, ["Oven"], ["vegetarian", "gluten-free"],
    [("eggs", 2), ("salsa", 150), ("cheddar", 20)],
    S("Heat the oven to 375°F / 190°C. Spread the salsa in a small oven dish.",
      "Crack in the eggs. Scatter the grated cheddar.",
      "Bake 12–15 minutes until the whites are set.",
      "Rest 1 minute. The dish will be hot."))

add("parsley-potatoes", "Parsley potatoes", "Boiled potatoes tossed with parsley and oil.", "Side", 25, ["Stove"], ["vegan", "vegetarian", "gluten-free", "dairy-free"],
    [("potatoes", 400), ("parsley", 10), ("olive_oil", 15), ("salt", 2), ("pepper", 1)],
    S("Cut the potatoes into even chunks.",
      "Simmer them in salted water for 12–15 minutes until a knife slides in. Drain.",
      "Toss with oil, chopped parsley and pepper.",
      "Serve warm."))

add("red-onion-beans", "Red onion and white beans", "Warm beans with red onion, vinegar and parsley.", "Salad", 15, ["Stove"], ["vegan", "vegetarian", "gluten-free", "dairy-free"],
    [("white_beans", 360), ("red_onion", 0.5), ("vinegar", 10), ("olive_oil", 15), ("parsley", 8), ("salt", 1)],
    S("Drain the beans. Finely dice the onion and chop the parsley.",
      "Toss the beans and onion with vinegar, oil and salt.",
      "Fold in the parsley.",
      "Rest 5 minutes and serve warm or cool."))

add("zucchini-eggs", "Zucchini eggs", "Shredded zucchini cooked into scrambled eggs.", "Breakfast", 15, ["Stove"], ["vegetarian", "gluten-free"],
    [("zucchini", 1), ("eggs", 3), ("olive_oil", 10), ("salt", 1), ("pepper", 1), ("basil", 3)],
    S("Grate the zucchini and squeeze out water. Beat the eggs with salt and pepper.",
      "Cook the zucchini in the oil for 3 minutes.",
      "Pour in the eggs and stir until just set.",
      "Tear in the basil and serve."))

add("honey-yogurt", "Honey yogurt with walnuts", "A bowl of yogurt, honey and walnuts.", "Breakfast", 5, ["Stove"], ["vegetarian", "gluten-free"],
    [("yogurt", 220), ("honey", 15), ("walnuts", 20), ("cinnamon", 1)],
    S("Spoon the yogurt into a bowl.",
      "Chop the walnuts.",
      "Add the honey and walnuts.",
      "Dust with cinnamon. Serve cold."))

add("mayo-tuna-lettuce", "Tuna lettuce cups", "Tuna mixed with a little mayonnaise in lettuce leaves.", "Lunch", 15, ["Stove"], ["gluten-free"],
    [("tuna", 142), ("mayonnaise", 20), ("lettuce", 80), ("lemon", 0.5), ("celery", 40), ("pepper", 1)],
    S("Drain the tuna. Finely dice the celery.",
      "Stir the tuna, mayonnaise, celery, lemon juice and pepper.",
      "Separate the lettuce leaves and wash them.",
      "Spoon the tuna into the leaves. Keep it cold."))

add("paprika-cauliflower", "Paprika cauliflower", "Cauliflower steaks roasted with paprika.", "Side", 35, ["Oven"], ["vegan", "vegetarian", "gluten-free", "dairy-free"],
    [("cauliflower", 500), ("paprika", 4), ("olive_oil", 15), ("salt", 2), ("lemon", 0.5)],
    S("Heat the oven to 425°F / 220°C. Cut the cauliflower into thick slabs or large florets.",
      "Brush with oil and sprinkle with paprika and salt.",
      "Roast 25–30 minutes until tender and browned.",
      "Finish with lemon."))

add("celery-apple", "Celery and apple salad", "Crunchy celery and apple with lemon and raisins.", "Salad", 15, ["Stove"], ["vegan", "vegetarian", "gluten-free", "dairy-free"],
    [("celery", 120), ("apple", 120), ("raisins", 20), ("lemon", 0.5), ("olive_oil", 10), ("salt", 1)],
    S("Slice the celery and dice the apple.",
      "Toss with raisins, lemon juice, oil and salt.",
      "Taste and add more lemon if you want it brighter.",
      "Serve soon."))

add("maple-carrots", "Maple carrots", "Carrots simmered, then glazed with a little maple.", "Side", 25, ["Stove"], ["vegan", "vegetarian", "gluten-free", "dairy-free"],
    [("carrots", 350), ("maple", 15), ("olive_oil", 10), ("salt", 1), ("pepper", 1)],
    S("Slice the carrots.",
      "Simmer them in a little salted water for 8–10 minutes until tender. Drain.",
      "Return them to the pan with oil and maple. Cook 2 minutes until glazed.",
      "Season with pepper and serve."))

add("basil-beans", "Basil white beans on toast", "Warm cannellini beans with tomato and basil on toast.", "Italian", 20, ["Stove"], ["vegan", "vegetarian", "dairy-free"],
    [("white_beans", 300), ("tomatoes", 150), ("basil", 6), ("garlic", 1), ("olive_oil", 12), ("bread", 80), ("salt", 1)],
    S("Slice the garlic. Warm it in the oil for 20 seconds.",
      "Add the tomatoes, drained beans and salt. Simmer 8 minutes. Mash a few beans.",
      "Tear in the basil. Toast the bread.",
      "Spoon the beans over the toast."))

add("jalapeno-corn", "Jalapeño corn and beans", "Sweetcorn, black beans and a little jalapeño.", "Mexican", 15, ["Stove"], ["vegan", "vegetarian", "gluten-free", "dairy-free"],
    [("corn", 200), ("black_beans", 200), ("jalapeno", 1), ("lime", 1), ("olive_oil", 8), ("salt", 1), ("cumin", 2)],
    S("Remove the seeds from the jalapeño if you want less heat, then mince it. Wash your hands.",
      "Warm the oil. Add the jalapeño and cumin for 30 seconds.",
      "Add the corn, drained beans and salt. Cook 5 minutes.",
      "Finish with lime."))

add("cinnamon-banana", "Pan banana with cinnamon", "Sliced banana warmed in a pan with cinnamon.", "Breakfast", 10, ["Stove"], ["vegan", "vegetarian", "gluten-free", "dairy-free"],
    [("banana", 2), ("cinnamon", 1), ("maple", 10), ("oat_milk", 40)],
    S("Slice the bananas.",
      "Warm them in a pan with the oat milk and cinnamon for 2–3 minutes.",
      "Add the maple and turn the slices once.",
      "Serve warm. They should be soft, not burnt."))

add("feta-salad", "Cucumber tomato feta", "Chopped cucumber and tomato with feta and oregano.", "Salad", 15, ["Stove"], ["vegetarian", "gluten-free"],
    [("cucumber", 1), ("fresh_tomato", 200), ("feta", 60), ("olive_oil", 15), ("oregano", 1), ("red_onion", 0.25), ("salt", 1)],
    S("Chop the cucumber, tomato and onion.",
      "Toss with oil, oregano and a little salt. Feta is salty, so taste first.",
      "Crumble the feta on top.",
      "Serve cool."))

add("walnut-pasta", "Walnut parsley pasta", "Pasta tossed with chopped walnuts, garlic and parsley.", "Italian", 25, ["Stove"], ["vegan", "vegetarian", "dairy-free"],
    [("pasta", 180), ("walnuts", 30), ("parsley", 10), ("garlic", 1), ("olive_oil", 15), ("salt", 1), ("pepper", 1)],
    S("Cook the pasta and reserve water. Chop the walnuts and parsley. Slice the garlic.",
      "Warm the oil and garlic for 20 seconds. Add the walnuts for 1 minute.",
      "Toss with the pasta, parsley, salt, pepper and a splash of pasta water.",
      "Serve immediately. Contains tree nuts."))

add("rice-flour-flat", "Rice-flour flatbreads", "Small stove breads from rice flour, for a gluten-free side.", "Bread", 20, ["Stove"], ["vegan", "vegetarian", "gluten-free", "dairy-free"],
    [("rice_flour", 120), ("olive_oil", 10), ("salt", 1)],
    S("Stir the rice flour, salt, oil and about 120 ml water into a thick batter. Rest 5 minutes.",
      "Heat a nonstick pan.",
      "Spoon two or three small rounds and cook 2–3 minutes per side until set and spotted.",
      "Serve warm. They are denser than wheat bread."))

add("gf-crumb-cauliflower", "Crusted cauliflower", "Cauliflower florets tossed with gluten-free crumbs and roasted.", "Side", 35, ["Oven"], ["vegetarian", "gluten-free"],
    [("cauliflower", 400), ("gf_breadcrumbs", 40), ("olive_oil", 15), ("salt", 2), ("paprika", 2), ("parsley", 4)],
    S("Heat the oven to 425°F / 220°C. Cut the cauliflower into florets.",
      "Toss with oil, salt, paprika and the crumbs.",
      "Roast 22–25 minutes until tender and the crumbs are golden.",
      "Finish with parsley."))

add("coconut-yogurt-berries", "Coconut yogurt and berries", "A dairy-free bowl of coconut yogurt and berries.", "Breakfast", 5, ["Stove"], ["vegan", "vegetarian", "gluten-free", "dairy-free"],
    [("coconut_yogurt", 200), ("berries", 80), ("maple", 10), ("almonds", 10)],
    S("Spoon the coconut yogurt into a bowl.",
      "Rinse and add the berries.",
      "Chop the almonds and scatter them.",
      "Drizzle the maple. Contains tree nuts if you keep the almonds."))

add("gf-oat-bowl", "Certified gluten-free oat bowl", "Certified gluten-free oats cooked in oat milk.", "Breakfast", 15, ["Stove"], ["vegan", "vegetarian", "gluten-free", "dairy-free"],
    [("gf_oats", 80), ("oat_milk", 300), ("banana", 1), ("cinnamon", 1), ("salt", 1)],
    S("Simmer the certified gluten-free oats, oat milk, cinnamon and a pinch of salt for 6–8 minutes.",
      "Stir often.",
      "Slice the banana.",
      "Serve the oats with the banana. This recipe uses certified gluten-free oats, not ordinary rolled oats."))

add("stock-beans", "Garlic beans in stock", "White beans warmed in stock with garlic and pepper.", "Comfort food", 20, ["Stove"], ["vegan", "vegetarian", "gluten-free", "dairy-free"],
    [("white_beans", 400), ("stock", 250), ("garlic", 2), ("olive_oil", 10), ("pepper", 1), ("salt", 1), ("parsley", 6)],
    S("Slice the garlic. Drain the beans.",
      "Warm the oil and cook the garlic 30 seconds.",
      "Add the beans, stock, salt and pepper. Simmer 10 minutes. Mash a spoonful to thicken.",
      "Stir in the parsley and serve."))

add("sugar-berries", "Warm berries with sugar", "Berries warmed just until juicy, with a little sugar.", "Dessert", 10, ["Stove"], ["vegan", "vegetarian", "gluten-free", "dairy-free"],
    [("frozen_berries", 200), ("sugar", 10), ("lemon", 0.5)],
    S("Put the berries, sugar and lemon juice in a small pan.",
      "Warm over medium-low heat for 4–5 minutes until the berries slump and the sugar dissolves.",
      "Do not boil them to a paste.",
      "Serve warm. This is a fruit side, not a measured dessert claim."))

add("oregano-potatoes", "Oregano potato wedges", "Oven wedges with oregano and oil.", "Side", 40, ["Oven"], ["vegan", "vegetarian", "gluten-free", "dairy-free"],
    [("potatoes", 450), ("oregano", 2), ("olive_oil", 15), ("salt", 2), ("garlic", 1)],
    S("Heat the oven to 425°F / 220°C. Cut the potatoes into wedges.",
      "Toss with oil, oregano, salt and chopped garlic.",
      "Roast 30–35 minutes, turning once, until the centers are soft and the edges brown.",
      "Serve hot."))

add("vinegar-cabbage", "Quick vinegar cabbage", "Shredded cabbage dressed with vinegar and oil.", "Side", 15, ["Stove"], ["vegan", "vegetarian", "gluten-free", "dairy-free"],
    [("cabbage", 250), ("vinegar", 15), ("olive_oil", 12), ("salt", 1), ("sugar", 4)],
    S("Shred the cabbage finely.",
      "Whisk the vinegar, oil, salt and sugar.",
      "Toss the cabbage with the dressing for a minute.",
      "Rest 5 minutes and serve. It stays crunchy."))

add("mozzarella-tomato-sandwich", "Tomato mozzarella sandwich", "Bread, tomato, mozzarella and basil.", "Lunch", 10, ["Stove"], ["vegetarian"],
    [("bread", 100), ("fresh_tomato", 80), ("mozzarella", 50), ("basil", 4), ("olive_oil", 8), ("salt", 1)],
    S("Slice the bread, tomato and mozzarella.",
      "Layer tomato, mozzarella and basil on the bread.",
      "Add oil and a little salt.",
      "Close the sandwich and serve. Cheese should have been kept cold until now."))

# Drop accidental zero-qty if any
for r in RECIPES:
    r["ingredients"] = [(i, q) for i, q in r["ingredients"] if q > 0]

def js_string(s):
    return "'" + s.replace("\\", "\\\\").replace("'", "\\'").replace("\n", " ") + "'"

lines = []
lines.append("// Generated by scripts/build-launch-library.py. Original PShop copy.")
lines.append("export const EXTRA_INGREDIENTS = [")
for i, name, unit, size, price, aisle in ING:
    lines.append(f"  {{id:{js_string(i)},name:{js_string(name)},unit:{js_string(unit)},packageSize:{size},packagePrice:{price},aisle:{js_string(aisle)}}},")
lines.append("];")
lines.append("export const EXTRA_ALIASES = {")
for k, v in ALIASES.items():
    lines.append(f"  {js_string(k)}:{js_string(v)},")
lines.append("};")
lines.append("export const EXTRA_RECIPES = [")
for r in RECIPES:
    ings = ",".join("{id:%s,qty:%s}" % (js_string(i), q if isinstance(q, int) or q != int(q) else int(q)) for i, q in r["ingredients"])
    steps = ",".join(js_string(s) for s in r["steps"])
    tags = ",".join(js_string(t) for t in r["tags"])
    equip = ",".join(js_string(e) for e in r["equipment"])
    n = r["nutrition"]
    lines.append("  {id:%s,name:%s,description:%s,cuisine:%s,time:%s,image:'/food/standard-dish.svg',imageTreatment:'standard-dish',revision:1,baseServings:2,ingredients:[%s],steps:[%s],nutrition:{calories:%s,protein:%s,carbs:%s,fat:%s},equipment:[%s],tags:[%s],nutritionMethod:'rough-estimate-v1'}," % (
        js_string(r["id"]), js_string(r["name"]), js_string(r["description"]), js_string(r["cuisine"]), r["time"], ings, steps, n["calories"], n["protein"], n["carbs"], n["fat"], equip, tags))
lines.append("];")
lines.append("export const LAUNCH_LIBRARY_VERSION = 1;")

BASE = {
 "chicken","rice","broccoli","lemon","olive_oil","salt","pepper","pasta","tomatoes","spinach","parmesan","garlic","tortillas","black_beans","corn","cheddar","cabbage","lime","dumplings","carrots","soy_sauce","rice_vinegar","sesame_oil","spring_onion","chickpeas","potatoes","coconut_milk","curry_powder","pumpkin_puree","pumpkin","white_beans","bread","gf_pasta","corn_tortillas","vegan_cheese","yeast","veg_dumplings","gf_dumplings","tamari"
}
ids = [r["id"] for r in RECIPES]
assert len(ids) == len(set(ids)), "duplicate recipe ids"
extra_ids = {i[0] for i in ING}
known = BASE | extra_ids
for r in RECIPES:
    for i, q in r["ingredients"]:
        if i not in known:
            raise SystemExit(f"unknown ingredient {i} in {r['id']}")
    if any(a == "pepper" and b != "pepper" for a, b in [(k, v) for k, v in ALIASES.items()]):
        raise SystemExit("alias collision")
print("ingredients", len(ING), "recipes", len(RECIPES))
Path("lib/launch-library.mjs").write_text("\n".join(lines) + "\n", encoding="utf-8")
