import { PageWrapper } from "../../static/wrappers";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { loadCardgroupFlashcards } from "../../store/actions/cardActions";
import AdmingroupCardView from "../submodules/adminGroupCardView";

const AdminCardGroupPage = (props) => {
  const cards = useSelector((state) => state.cardReducer.cards);
  const dispatch = useDispatch();

  const cardgroupId = props.match.params.id;

  useEffect(() => {
    dispatch(loadCardgroupFlashcards(cardgroupId));
  }, [dispatch, cardgroupId]);

  console.log("cards", cards);
  return (
    <PageWrapper>
      <div>
        <AdmingroupCardView cards={cards} />
      </div>
    </PageWrapper>
  );
};

export default AdminCardGroupPage;
