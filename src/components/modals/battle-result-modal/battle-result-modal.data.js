const messages = {
  attackerIsWinner: 'Przeciwnik musiał ustąpić! Zwiadowcy donoszą, że udało się przejąć część przedmiotów wroga.',
  defenderIsWinner: 'Porażka!? Podobno wszystko było przemyślane... Następnym razem lepiej się przygotuj. Jak to mówią - teraz trzeba odrobić.',
  draw: 'Najpierw padła tarcza ochronna a poźniej całe zasilanie. Twojemu przeciwnikowi tak samo... przypadek? Remis!',
};

export const getBattleResultMessage = (attacker) => {
  if(attacker.status === 'Winner') return messages.attackerIsWinner;
  else if(attacker.status === 'Defeated') return messages.defenderIsWinner;
  else if(attacker.status === 'Draw') return messages.draw;
}