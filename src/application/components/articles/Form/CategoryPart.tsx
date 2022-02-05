import React, { useMemo } from "react";
import { translate } from "../../../../translate/translate";
import { required } from "../../../../validation";
import SelectTextWithValidation from "../../../../components/withValidation/SelectTextWithValidation";
import { useCategoriesQuery, useInsertCategoryMutation } from "../../../../apollo-graphql/graphql";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { openDialogUserForm } from "./CategoryForm";
import { TCategory } from "../../../../apollo-graphql/type_logic/types";
import { useQuery } from "../../../hooks/useQuery";
import { useApplication } from "../../../hooks/useApplication";
import { useToast } from "../../../hooks/useToast";
import { processErrorGraphQL } from "../../../../apollo";

type TCategoryFormProps = {
  validation: any;
}

const CategoryPart = ({validation}: TCategoryFormProps) => {

  const {isAdmin} = useApplication()
  const {toastSuccess} = useToast()
  const [mutationInsert] = useInsertCategoryMutation();

  const {data:categoryData, refetch: refetchCategories} = useQuery(useCategoriesQuery,{
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "network-only"
  })

  const categories = useMemo(() => !categoryData?.data || !categoryData.data.items || !categoryData.data.items.length ? [] : categoryData.data.items.map((cat: any) => ({
    label: cat.name,
    value: cat.id
  })) ,[categoryData])

  const addCategory = async (category: TCategory) => mutationInsert({
    variables: {
      data: category
    }
  }).then(v => {
    refetchCategories().then()
    toastSuccess(translate.CATEGORY_SUCCESS_CREATED_TEXT)
  })
.catch(e => processErrorGraphQL(e))

  const handlerAddCategory = () => {
    isAdmin && openDialogUserForm({
      submitFun: addCategory
    })
  }

  return (
    <div className={'article-category-part'}>
      { isAdmin && <FontAwesomeIcon icon={faPlusCircle} onClick={handlerAddCategory} className={'category-add-icon'}/> }
      <SelectTextWithValidation
        label={translate.ARTICLE_FORM_SELECT_CATEGORY_LABEL}
        helperText={translate.ARTICLE_FORM_SELECT_CATEGORY_HELPER_TEXT}
        options={categories}
        validation={{
          useValidation: validation,
          model: 'categoryId',
          rule: {
            required
          }
        }}
      />
    </div>
  )
}

export default CategoryPart