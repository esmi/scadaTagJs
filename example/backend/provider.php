<?php
class provider {
  private $equipName = 'tag';
  function __construct() {
  }
  function isEquipName($fd) {
    return $fd == $this->equipName;
  }
  function getEquipName() {
    return $this->equipName;
  }

  function get_scada_data() {
    return [
      [ 'tag' => 'U1001', 'value' => 0 ],
      [ 'tag' => 'U1002', 'value' => 0 ],
      [ 'tag' => 'U1003', 'value' => 1 ],
      [ 'tag' => 'U1004', 'value' => 0 ],
      [ 'tag' => 'U1005', 'value' => 1 ],
      [ 'tag' => 'U1006', 'value' => 1 ],
      [ 'tag' => 'U1007', 'value' => 1 ],
      [ 'tag' => 'U1008', 'value' => 1 ],

      [ 'tag' => 'U1013', 'value' => 1 ],
      [ 'tag' => 'U1014', 'value' => 1 ],
      [ 'tag' => 'U1015', 'value' => 1 ],
      [ 'tag' => 'U1016', 'value' => 1 ],

      [ 'tag' => 'U1043', 'value' => 1 ],
      [ 'tag' => 'U1044', 'value' => 1 ],

      [ 'tag' => 'U2301', 'value' => 0 ],

      [ 'tag' => 'U2316', 'value' => 0 ],
      [ 'tag' => 'U2317', 'value' => 0 ],
      [ 'tag' => 'U2318', 'value' => 0 ],
      [ 'tag' => 'U2319', 'value' => 0 ],
      [ 'tag' => 'U2320', 'value' => 0 ],
      [ 'tag' => 'U2321', 'value' => 0 ],
    ];
  }
}

 ?>
