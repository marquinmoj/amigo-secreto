import { useEffect, useState } from 'react';
import api from '../api/client';

export default function PipelinePage() {
  const [stages, setStages] = useState([]);

  const load = () => api.get('/pipeline').then((res) => setStages(res.data));
  useEffect(() => { load(); }, []);

  const onDragStart = (event, opportunityId) => {
    event.dataTransfer.setData('opportunityId', opportunityId);
  };

  const onDrop = async (event, stageId) => {
    event.preventDefault();
    const opportunityId = event.dataTransfer.getData('opportunityId');
    await api.patch(`/pipeline/opportunities/${opportunityId}/move`, { stageId });
    load();
  };

  return (
    <section>
      <h2>Embudo visual (Kanban)</h2>
      <div className="kanban">
        {stages.map((stage) => (
          <article key={stage.id} className="card column" onDragOver={(e) => e.preventDefault()} onDrop={(e) => onDrop(e, stage.id)}>
            <h3>{stage.name}</h3>
            {stage.opportunities.map((opp) => (
              <div key={opp.id} className="opportunity" draggable onDragStart={(e) => onDragStart(e, opp.id)}>
                <strong>{opp.title}</strong>
                <p>{opp.contact.name || opp.contact.phoneNumber}</p>
                <small>${opp.estimatedValue}</small>
              </div>
            ))}
          </article>
        ))}
      </div>
    </section>
  );
}
