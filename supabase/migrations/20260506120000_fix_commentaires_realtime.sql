-- Activer la publication realtime sur nourania_commentaires_eleves
-- pour que les élèves reçoivent les notes en temps réel sans recharger la page

ALTER PUBLICATION supabase_realtime ADD TABLE nourania_commentaires_eleves;

-- S'assurer que la politique de lecture des élèves est bien en place
DROP POLICY IF EXISTS "student_read_own_commentaire" ON nourania_commentaires_eleves;
CREATE POLICY "student_read_own_commentaire" ON nourania_commentaires_eleves
  FOR SELECT TO authenticated
  USING (student_id = auth.uid());
