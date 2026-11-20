import {
    getCategoryDetails,
    getProjectsByCategoryId
} from '../models/categories.js';

export const showCategoryDetailsPage = async (req, res, next) => {
    try {
        const categoryId = req.params.id;

        const category = await getCategoryDetails(categoryId);

        if (!category) {
            return res.status(404).render('404', {
                title: 'Category Not Found'
            });
        }

        const projects = await getProjectsByCategoryId(categoryId);

        res.render('category', {
            title: category.category_name,
            category,
            projects
        });
    } catch (error) {
        next(error);
    }
};